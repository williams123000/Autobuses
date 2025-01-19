import { useState, useEffect } from 'react';
import { busService } from '../services/busService';

export const useBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      // Simular un retraso de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await busService.getAll();
      setBuses(data);
    } catch (err) {
      setError('Error al cargar autobuses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return { buses, loading, error, fetchBuses };
};