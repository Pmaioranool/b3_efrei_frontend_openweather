import { infoToast } from "../utils/toastUtils.jsx";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchWeatherDataByCity(city) {
  try {
    toast.loading("Recherche de la météo...");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );

    if (!response.ok) {
      throw new Error("Ville non trouvée");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Météo trouvée !");
    return data;
  } catch (error) {
    toast.dismiss();
    toast.error(error.message);
    return null; // important pour tester dans le submit
  }
}
export async function fetchWeatherData(latitude, longitude) {
  try {
    toast.loading("Recherche de la météo...");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
    );

    if (!response.ok) {
      throw new Error("Ville non trouvée");
    }

    const data = await response.json();
    toast.dismiss();
    toast.success("Météo trouvée !");
    return data;
  } catch (error) {
    toast.dismiss();
    toast.error(error.message);
    return null; // important pour tester dans le submit
  }
}
