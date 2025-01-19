import React, {useState} from "react";
import {DriverForm} from "./driverForm";
import {DriverTable} from "./driverTable";
import {Loading} from "../common/loaging";
import {ErrorMessage} from "../common/errorMessage";
import {useDrivers} from "../../hooks/useDrivers";
import {driverService} from "../../services/driverService";
import Swal from "sweetalert2";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

export const DriverPage = () => {
    console.log("DriverPage");
    const {drivers, loading, error, fetchDrivers} = useDrivers();
    const [driverToEdit, setDriverToEdit] = useState(null);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id) => {
        try {
            await driverService.delete(id);
            fetchDrivers();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Conductor eliminado exitosamente.",
            });
        } catch (error) {
            console.error("Error deleting driver:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "No se pudo eliminar el conductor. Inténtalo de nuevo.",
            });
        }
    };

    const handleEdit = (driver) => {
        setDriverToEdit(driver);
        setOpen(true);
    }

    const handleAdd = () => {
        setDriverToEdit(null);
        setOpen(true);
    }

    const handleSuccess = () => {
        fetchDrivers();
        setDriverToEdit(null);
    }

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Agregar Conductor
                </Button>
            </div>

            <DriverTable
                drivers={drivers}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <DriverForm
                open={open}
                onOpenChange={setOpen}
                onSuccess={handleSuccess}
                driverToEdit={driverToEdit}
            />
        </div>
    );
};