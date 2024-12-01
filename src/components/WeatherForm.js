import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Typography, Spin, Row, Col, Divider, Space } from 'antd';
import { fetchWeather } from '../api/Weather'; 

const { Title, Text } = Typography;

const WeatherForm = () => {
  const [city, setCity] = useState('Addis Ababa');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    handleSubmit(); 
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('An error occurred while fetching the weather:', err);
      setError('An error occurred while fetching the weather.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ fontWeight: 'bold', color: '#1d1f22' }}>Weather Dashboard</Title>
      
      <div style={{ display: 'flex', marginBottom: '30px', width: '100%', maxWidth: '500px' }}>
        <Input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ flexGrow: 1, marginRight: '10px', padding: '12px' }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            padding: '12px 20px',
            fontWeight: 'bold',
          }}
        >
          Get Weather
        </Button>
      </div>
      
      {loading && <Spin size="large" />}
      {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
      
      {weather && (
        <Card
          title={<Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Weather in {weather.name}</Text>}
          cover={<img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} style={{ width: '120px', height: '120px', margin: '0 auto' }} />}
          style={{ width: '100%', maxWidth: '500px', textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4c4c4c' }}>Temperature: <Text style={{ fontSize: '22px', color: '#1890ff' }}>{weather.main.temp} °C</Text></p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4c4c4c' }}>Humidity: <Text style={{ fontSize: '22px', color: '#1890ff' }}>{weather.main.humidity}%</Text></p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4c4c4c' }}>Wind Speed: <Text style={{ fontSize: '22px', color: '#1890ff' }}>{weather.wind.speed} m/s</Text></p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4c4c4c' }}>Pressure: <Text style={{ fontSize: '22px', color: '#1890ff' }}>{weather.main.pressure} hPa</Text></p>
            </Col>
          </Row>
          <Divider />
          <Space direction="vertical" style={{ fontSize: '18px', color: '#4c4c4c' }}>
            <p><strong>Description:</strong> <Text style={{ fontSize: '20px', color: '#1890ff' }}>{weather.weather[0].description}</Text></p>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default WeatherForm;
