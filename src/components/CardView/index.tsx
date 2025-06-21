import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import Divider from "../Divider";
import { CAR_ASSETS_BASE_URL } from "../../constants/car";
import BuyButton from "../BuyButton";
import { CarModel } from "./props";
const Logo = require("../../../assets/logo.png");
import { handlePreviousItem, handleNextItem, loadCarData } from "./actions";
import { getTotalCarsCount } from "../../api/getCars";

export default function CardView() {
  const [carData, setCarData] = useState<CarModel | null>(null);
  const [totalCars, setTotalCars] = useState<number>(10);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = async () => {
    fadeOut();
    setTimeout(async () => {
      await handleNextItem(carData, setCarData);
      fadeIn();
    }, 150);
  };

  const handlePrevious = async () => {
    fadeOut();
    setTimeout(async () => {
      await handlePreviousItem(carData, setCarData);
      fadeIn();
    }, 150);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCarData(1, setCarData);
      const count = await getTotalCarsCount();
      setTotalCars(count);
    };
    fetchData();
  }, []);

  // Componentes de renderização
  const renderLogoBox = () => (
    <View style={styles.logoContainer}>
      <Image style={styles.imageLogo} source={Logo} />
    </View>
  );

  const renderCarImage = () => {
    if (!carData) return null;
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          style={styles.image}
          source={{ uri: `${CAR_ASSETS_BASE_URL}${carData.id}.png` }}
          onError={(e) =>
            console.log("Erro ao carregar imagem:", e.nativeEvent.error)
          }
          defaultSource={Logo}
        />
      </Animated.View>
    );
  };
  const renderCarDetails = () => (
    <Animated.View style={[styles.carDetailsContainer, { opacity: fadeAnim }]}>
      <Text style={styles.carBrand}>Lamborghini</Text>
      <Text style={styles.carName} numberOfLines={2} adjustsFontSizeToFit>
        {carData?.carName}
      </Text>
    </Animated.View>
  );
  // Botões de navegação
  const renderNavButtons = () => {
    return (
      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity
          style={styles.navButtonBig}
          onPress={handlePrevious}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonTextBig}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtonBig}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonTextBig}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPriceControls = () => {
    if (!carData) return null;
    return (
      <View style={styles.priceLabelContainer}>
        <Animated.Text style={[styles.priceLabel, { opacity: fadeAnim }]}>
          {carData.price}
        </Animated.Text>
      </View>
    );
  };
  return (
    <View style={styles.imageContainer}>
      {renderLogoBox()}
      <Divider />

      {carData ? (
        <>
          {renderCarDetails()}
          {renderCarImage()}
          {renderNavButtons()}
          <BuyButton />
          {renderPriceControls()}
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#01a6b3" />
          <Text style={styles.loadingText}>Carregando modelos...</Text>
        </View>
      )}
    </View>
  );
}
