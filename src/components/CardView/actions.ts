import { fetchGetCarsData, getTotalCarsCount } from "../../api/getCars";
import { CarModel } from "./props";

export const loadCarData = async (
  id: number,
  setCarData: React.Dispatch<React.SetStateAction<CarModel | null>>
) => {
  const response = await fetchGetCarsData(id);

  try {
    if (response) {
      setCarData(response);
    }
  } catch (error) {
    console.error("Erro ao buscar dados do carro:", error);
    setCarData(null);
  }
};

export const handlePreviousItem = async (
  carData: CarModel | null,
  setCarData: React.Dispatch<React.SetStateAction<CarModel | null>>
) => {
  if (!carData) return;

  const totalCars = await getTotalCarsCount();

  if (carData.id > 1) {
    // Se não for o primeiro carro, vá para o anterior
    await loadCarData(carData.id - 1, setCarData);
  } else {
    // Se for o primeiro carro, vá para o último
    await loadCarData(totalCars, setCarData);
  }
};

export const handleNextItem = async (
  carData: CarModel | null,
  setCarData: React.Dispatch<React.SetStateAction<CarModel | null>>
) => {
  if (!carData) return;

  const totalCars = await getTotalCarsCount();

  if (carData.id < totalCars) {
    // Se não for o último carro, vá para o próximo
    await loadCarData(carData.id + 1, setCarData);
  } else {
    // Se for o último carro, volte para o primeiro
    await loadCarData(1, setCarData);
  }
};
