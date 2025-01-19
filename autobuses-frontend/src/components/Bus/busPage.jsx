import React, { useState } from "react";
import { BusForm } from "./busForm";
import { BusTable } from "./busTable";
import { Loading } from "../common/loaging";
import { ErrorMessage } from "../common/errorMessage";
import { useBuses } from "../../hooks/useBuses";
import { busService } from "../../services/busService";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const BusPage = () => {
    const { buses, loading, error, fetchBuses } = useBuses();
    const [busToEdit, setBusToEdit] = useState(null);
    const [open, setOpen] = useState(false);
    
    const handleDelete = async (id) => {
        try {
            await busService.delete(id);
            fetchBuses();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Autobús eliminado exitosamente.",
            });
        } catch (error) {
            console.error("Error deleting bus:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "No se pudo eliminar el autobús. Inténtalo de nuevo.",
            });
        }
    };

    const handleEdit = (bus) => {
        setBusToEdit(bus);
        setOpen(true);
    };

    const handleAdd = () => {
        setBusToEdit(null);
        setOpen(true);
    };

    const handleSuccess = () => {
        fetchBuses();
        setBusToEdit(null);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Agregar Autobús
                </Button>
            </div>
            
            <BusTable 
                buses={buses} 
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <BusForm 
                open={open}
                onOpenChange={setOpen}
                onSuccess={handleSuccess} 
                busToEdit={busToEdit}
            />
        </div>
    );
};