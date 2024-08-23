import React, { useState } from 'react';
import { Input, Button, Card, Typography, Spin } from 'antd';
import { fetchWeather } from '../api/Weather';
import { supabase } from '../supabaseClient';

const { Title } = Typography;

const WeatherForm = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      if (data.cod === 200) {
        setWeather(data);
        // Insert weather data into Supabase
        const { data: insertedData, error: insertError } = await supabase
          .from('weather')
          .insert([
            { 
              city: city, 
              temperature: data.main.temp, 
              humidity: data.main.humidity, 
              weather: data.weather[0].description 
            }
          ]);

        if (insertError) {
          console.error('Error inserting data:', insertError);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching the weather.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Weather Dashboard</Title>
      <Input
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ width: '200px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleSubmit} loading={loading}>
        Get Weather
      </Button>
      {loading && <Spin />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {weather && (
        <Card
          title={`Weather in ${weather.name}`}
          cover={<img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />}
        >
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </Card>
      )}
    </div>
  );
};

export default WeatherForm;
