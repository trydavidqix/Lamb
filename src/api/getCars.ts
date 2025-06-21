import axios from "axios";
import { CarModel } from "../components/CardView/props";
import { CAR_API_BASE_URL } from "../constants/car";
interface ApiResponse {
  cars: CarModel[];
}

// Cache para armazenar a contagem total de carros e evitar múltiplas chamadas à API
let totalCarsCount: number | null = null;

export const fetchGetCarsData = async (id: number) => {
  try {
    const response = await axios.get<ApiResponse>(CAR_API_BASE_URL);
    // Armazenar o número total de carros se ainda não estiver em cache
    if (totalCarsCount === null) {
      totalCarsCount = response.data.cars.length;
    }
    const carData = response.data.cars.find((car) => car.id === id) || null;
    return carData;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
};

export const getTotalCarsCount = async (): Promise<number> => {
  // Se já tivermos o número total de carros em cache, retorne-o
  if (totalCarsCount !== null) {
    return totalCarsCount;
  }

  // Caso contrário, faça a chamada à API para obter o número
  try {
    const response = await axios.get<ApiResponse>(CAR_API_BASE_URL);
    totalCarsCount = response.data.cars.length;
    return totalCarsCount;
  } catch (error) {
    console.error("Erro ao buscar contagem de carros:", error);
    return 10; // Valor padrão caso haja erro
  }
};
