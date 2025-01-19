import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { journeyService } from "../../services/journeyService";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const JourneyForm = ({ open, onOpenChange, onSuccess, journeyToEdit }) => {
    const [formData, setFormData] = useState({
        idJourney: '',
        deapartureDate: '',
        deapartureTime: '',
        price: '',
        bus: '',
        driver: '',
        origin: '',
        destination: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (journeyToEdit) {
            setFormData({
                idJourney: journeyToEdit.idJourney,
                deapartureDate: journeyToEdit.deapartureDate,
                deapartureTime: journeyToEdit.deapartureTime,
                price: journeyToEdit.price,
                bus: journeyToEdit.bus.idBus,
                driver: journeyToEdit.driver.idDriver,
                origin: journeyToEdit.origin.idTerminal,
                destination: journeyToEdit.destination.idTerminal
            });
        } else {
            setFormData({
                idJourney: '',
                deapartureDate: '',
                deapartureTime: '',
                price: '',
                bus: '',
                driver: '',
                origin: '',
                destination: ''
            });
        }
        // Limpiar error cuando se abre/cierra el modal
        setError('');
    }, [journeyToEdit, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (journeyToEdit) {
                await journeyService.update(journeyToEdit.idJourney, formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Actualizado",
                        text: "Viaje actualizado exitosamente.",
                    });
                }, 500);
            } else {
                await journeyService.create(formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Creado",
                        text: "Viaje creado exitosamente.",
                    });
                }, 500);
            }
        } catch (err) {
            console.error("Error: ", err);
            setError(err.message || "Error al guardar el viaje. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {journeyToEdit ? 'Editar Viaje' : 'Nuevo Viaje'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    <Input 
                        type="number"
                        placeholder="ID Viaje"
                        value={formData.idJourney}
                        onChange={(e) => setFormData({ ...formData, idJourney: e.target.value })}
                        disabled={journeyToEdit}
                    />
                    <Input 
                        type={formData.deapartureDate ? "date" : "text"}
                        placeholder="Fecha de salida"
                        onFocus={(e) => e.target.type = "date"}
                        onBlur={(e) => {
                            if (!e.target.value) {
                                e.target.type = "text";
                            }
                        }}
                        value={formData.deapartureDate}
                        onChange={(e) => setFormData({ ...formData, deapartureDate: e.target.value })}
                    />
                    <Input 
                        type={formData.deapartureTime ? "time" : "text"}
                        placeholder="Hora de salida"
                        onFocus={(e) => e.target.type = "time"}
                        onBlur={(e) => {
                            if (!e.target.value) {
                                e.target.type = "text";
                            }
                        }}
                        value={formData.deapartureTime}
                        onChange={(e) => setFormData({ ...formData, deapartureTime: e.target.value })}
                    />
                    <Input 
                        type="number"
                        placeholder="Precio"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <Input 
                        type="number"
                        placeholder="ID Autobús"
                        value={formData.bus}
                        onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                    />
                    <Input 
                        type="number"
                        placeholder="ID Conductor"
                        value={formData.driver}
                        onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                    />
                    <Input 
                        type="number"
                        placeholder="ID Terminal Origen"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                    <Input 
                        type="number"
                        placeholder="ID Terminal Destino"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                    >
                        {loading ? (
                            "Procesando..."
                        ) : journeyToEdit ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Actualizar Viaje
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Agregar Viaje
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
            </Dialog>
    );
};


