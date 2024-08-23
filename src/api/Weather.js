const API_KEY = "ef698a550f16d753b4e52a22866d31ff" ;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
};



