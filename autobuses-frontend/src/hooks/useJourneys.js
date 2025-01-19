import { useState, useEffect } from "react";
import { journeyService } from "../services/journeyService";

export const useJourneys = () => {
    const [journeys, setJourneys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchJourneys = async () => {
        try {
        setLoading(true);
        // Simular un retraso de 2 segundos
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await journeyService.getAll();
        setJourneys(data);
        } catch (err) {
        setError("Error al cargar viajes");
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchJourneys();
    }, []);
    
    return { journeys, loading, error, fetchJourneys };
};