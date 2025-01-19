import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchUsers = async () => {
        try {
        setLoading(true);
        // Simular un retraso de 2 segundos
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await userService.getAll();
        setUsers(data);
        } catch (err) {
        setError("Error al cargar usuarios");
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    return { users, loading, error, fetchUsers };
};