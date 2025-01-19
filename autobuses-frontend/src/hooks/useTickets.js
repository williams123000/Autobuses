import { useState, useEffect } from "react";
import { ticketService } from "../services/ticketService";

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchTickets = async () => {
        try {
        setLoading(true);
        // Simular un retraso de 2 segundos
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await ticketService.getAll();
        setTickets(data);
        } catch (err) {
        setError("Error al cargar boletos");
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchTickets();
    }, []);
    
    return { tickets, loading, error, fetchTickets };
};