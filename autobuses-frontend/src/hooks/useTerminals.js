import { useState, useEffect } from 'react';
import { terminalService } from '../services/terminalService';

export const useTerminals = () => {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTerminals = async () => {
    try {
      setLoading(true);
      // Simular un retraso de 1 segundos
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = await terminalService.getAll();
      setTerminals(data);
    } catch (err) {
      setError('Error al cargar terminales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerminals();
  }, []);

  return { terminals, loading, error, fetchTerminals };
};