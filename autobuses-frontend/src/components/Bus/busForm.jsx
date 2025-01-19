import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { busService } from "../../services/busService";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const BusForm = ({ open, onOpenChange, onSuccess, busToEdit }) => {
    const [formData, setFormData] = useState({
        idBus: '',
        numSeating: '',
        tuition: '',
        brand: '',
        model: '',
        terminal: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (busToEdit) {
            setFormData({
                idBus: busToEdit.idBus,
                numSeating: busToEdit.numSeating,
                tuition: busToEdit.tuition,
                brand: busToEdit.brand,
                model: busToEdit.model,
                terminal: busToEdit.terminal.idTerminal
            });
        } else {
            setFormData({
                idBus: '',
                numSeating: '',
                tuition: '',
                brand: '',
                model: '',
                terminal: ''
            });
        }
        // Limpiar error cuando se abre/cierra el modal
        setError('');
    }, [busToEdit, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (busToEdit) {
                await busService.update(busToEdit.idBus, formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'Autobús actualizado exitosamente.',
                    });
                }, 100);
            } else {
                await busService.create(formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Creado',
                        text: 'Autobús creado exitosamente.',
                    });
                }, 100);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'No se pudo procesar la operación. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {busToEdit ? 'Editar Autobús' : 'Agregar Autobús'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            type="number"
                            placeholder="ID Bus"
                            value={formData.idBus}
                            onChange={(e) => setFormData({...formData, idBus: e.target.value})}
                            disabled={busToEdit}
                        />
                        <Input
                            type="number"
                            placeholder="Número de Asientos"
                            value={formData.numSeating}
                            onChange={(e) => setFormData({...formData, numSeating: e.target.value})}
                        />
                        <Input
                            placeholder="Matrícula"
                            value={formData.tuition}
                            onChange={(e) => setFormData({...formData, tuition: e.target.value})}
                        />
                        <Input
                            placeholder="Marca"
                            value={formData.brand}
                            onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        />
                        <Input
                            placeholder="Modelo"
                            value={formData.model}
                            onChange={(e) => setFormData({...formData, model: e.target.value})}
                        />
                        <Input
                            placeholder="Terminal"
                            value={formData.terminal}
                            onChange={(e) => setFormData({...formData, terminal: e.target.value})}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                    >
                        {loading ? (
                            "Procesando..."
                        ) : busToEdit ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Actualizar Autobús
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Agregar Autobús
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};