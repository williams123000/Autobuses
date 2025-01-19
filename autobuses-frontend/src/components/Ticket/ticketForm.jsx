import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { ticketService } from "../../services/ticketService";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const TicketForm = ({ open, onOpenChange, onSuccess, ticketToEdit }) => {
    const [formData, setFormData] = useState({
        idTicket: '',
        journey: '',
        user: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (ticketToEdit) {
            setFormData({
                idTicket: ticketToEdit.idTicket,
                journey: ticketToEdit.journey.idJourney,
                user: ticketToEdit.user.idUser,
            });
        } else {
            setFormData({
                idTicket: '',
                journey: '',
                user: '',
            });
        }
        // Limpiar error cuando se abre/cierra el modal
        setError('');
    }
    , [ticketToEdit, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (ticketToEdit) {
                await ticketService.update(ticketToEdit.idTicket, formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: 'Boleto actualizado exitosamente.',
                });
            } else {
                await ticketService.create(formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                Swal.fire({
                    icon: 'success',
                    title: 'Creado',
                    text: 'Boleto creado exitosamente.',
                });
            }
        } catch (error) {
            console.error('Error creating/updating ticket:', error);
            setError(error.message || 'Error al crear/actualizar boleto');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {ticketToEdit ? 'Editar Boleto' : 'Crear Boleto'}
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
                        label="ID Boleto"
                        value={formData.idTicket}
                        onChange={(e) => setFormData({ ...formData, idTicket: e.target.value })}
                    />
                    <Input
                        label="Viaje"
                        value={formData.journey}
                        onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                    />
                    <Input
                        label="Usuario"
                        value={formData.user}
                        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    />
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            "Procesando..."
                        ) : ticketToEdit ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Actualizar boleto
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Agregar boleto
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
        