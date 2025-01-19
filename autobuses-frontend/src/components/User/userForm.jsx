import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const UserForm = ({ open, onOpenChange, onSuccess, userToEdit }) => {
    const [formData, setFormData] = useState({
        idUser: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        journey: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                idUser: userToEdit.idUser,
                name: userToEdit.name,
                lastName: userToEdit.lastName,
                email: userToEdit.email,
                phone: userToEdit.phone,
                journey: userToEdit.journey.idJourney
            });
        } else {
            setFormData({
                idUser: '',
                name: '',
                lastName: '',
                email: '',
                phone: '',
                journey: ''
            });
        }
        // Limpiar error cuando se abre/cierra el modal
        setError('');
    }, [userToEdit, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (userToEdit) {
                await userService.update(userToEdit.idUser, formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: 'Usuario actualizado exitosamente.',
                });
            } else {
                await userService.create(formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                Swal.fire({
                    icon: 'success',
                    title: 'Creado',
                    text: 'Usuario creado exitosamente.',
                });
            }
        } catch (error) {
            console.error('Error creating/updating user:', error);
            setError(error.message || 'No se pudo crear/actualizar el usuario. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {userToEdit ? 'Editar Usuario' : 'Crear Usuario'}
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
                            type="numer"
                            placeholder="ID Usuario"
                            value={formData.idUser}
                            onChange={(e) => setFormData({ ...formData, idUser: e.target.value })}
                            disabled={userToEdit}
                        />
                    <Input
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <Input
                        placeholder="Correo"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                        placeholder="Viaje"
                        value={formData.journey}
                        onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                    />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            "Procesando..."
                        ) : userToEdit ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Actualizar usuario
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Agregar usuario
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};