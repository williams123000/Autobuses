import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { driverService } from "../../services/driverService";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";

export const DriverForm = ({ open, onOpenChange, onSuccess, driverToEdit }) => {
    const [formData, setFormData] = useState({
        idDriver: '',
        name: '',
        lastName: '',
        email: '',
        lisenseNumber: '',
        phone: '',
        gender: '',
        birthdate: '',
        address: '',
        terminal: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (driverToEdit) {
            setFormData({
                idDriver: driverToEdit.idDriver,
                name: driverToEdit.name,
                lastName: driverToEdit.lastName,
                email: driverToEdit.email,
                lisenseNumber: driverToEdit.lisenseNumber,
                phone: driverToEdit.phone,
                gender: driverToEdit.gender,
                birthdate: driverToEdit.birthdate,
                address: driverToEdit.address,
                terminal: driverToEdit.terminal.idTerminal
            });
        } else {
            setFormData({
                idDriver: '',
                name: '',
                lastName: '',
                email: '',
                lisenseNumber: '',
                phone: '',
                gender: '',
                birthdate: '',
                address: '',
                terminal: ''
            });
        }
        // Limpiar error cuando se abre/cierra el modal
        setError('');
    }, [driverToEdit, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (driverToEdit) {
                await driverService.update(driverToEdit.idDriver, formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'Conductor actualizado exitosamente.',
                    });
                }, 100);
            } else {
                await driverService.create(formData);
                onOpenChange(false);
                onSuccess();
                // Mostrar Swal después de cerrar el modal
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Creado',
                        text: 'Conductor creado exitosamente.',
                    });
                }, 100);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {driverToEdit ? 'Editar conductor' : 'Agregar conductor'}
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
                            placeholder="ID Conductor"
                            value={formData.idDriver}
                            onChange={e => setFormData({ ...formData, idDriver: e.target.value })}
                            disabled={driverToEdit}
                        />
                        <Input
                            placeholder="Nombre"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            placeholder="Apellido"
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}

                        />
                        <Input
                            placeholder="Email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}

                        />
                        <Input
                            placeholder="Número de licencia"
                            value={formData.lisenseNumber}
                            onChange={e => setFormData({ ...formData, lisenseNumber: e.target.value })}

                        />
                        <Input
                            placeholder="Teléfono"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}

                        />
                        <Input
                            placeholder="Género"
                            value={formData.gender}
                            onChange={e => setFormData({ ...formData, gender: e.target.value })}

                        />
                        <Input
                            type={formData.birthdate ? "date" : "text"}
                            placeholder="Fecha de nacimiento"
                            onFocus={(e) => e.target.type = "date"}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    e.target.type = "text"
                                }
                            }}
                            value={formData.birthdate}
                            onChange={e => setFormData({ ...formData, birthdate: e.target.value })}
                        />
                        <Input
                            placeholder="Dirección"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}

                        />
                        <Input
                            placeholder="Terminal"
                            value={formData.terminal}
                            onChange={e => setFormData({ ...formData, terminal: e.target.value })}

                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >

                        {loading ? (
                            "Procesando..."
                        ) : driverToEdit ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Actualizar conductor
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Agregar conductor
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

