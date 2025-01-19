import {useState, useEffect} from 'react';
import {driverService} from '../services/driverService';

export const useDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchDrivers = async () => {
        try {
        setLoading(true);
        // Simular un retraso de 2 segundos
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await driverService.getAll();
        setDrivers(data);
        } catch (err) {
        setError('Error al cargar conductores');
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDrivers();
    }, []);
    
    return {drivers, loading, error, fetchDrivers};
};