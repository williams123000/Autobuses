import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { terminalService } from '../../services/terminalService';
import Swal from 'sweetalert2';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const TerminalForm = ({ open, onOpenChange, onSuccess, terminalToEdit }) => {
  const [formData, setFormData] = useState({
    idTerminal: '',
    state: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (terminalToEdit) {
      setFormData({
        idTerminal: terminalToEdit.idTerminal,
        state: terminalToEdit.state,
        address: terminalToEdit.address
      });
    } else {
      setFormData({
        idTerminal: '',
        state: '',
        address: ''
      });
    }
    // Limpiar error cuando se abre/cierra el modal
    setError('');
  }, [terminalToEdit, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (terminalToEdit) {
        await terminalService.update(terminalToEdit.idTerminal, formData);
        onOpenChange(false);
        onSuccess();
        // Mostrar Swal después de cerrar el modal
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Terminal actualizada exitosamente.'
          });
        }, 500);
      } else {
        await terminalService.create(formData);
        onOpenChange(false);
        onSuccess();
        // Mostrar Swal después de cerrar el modal
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'Terminal agregada exitosamente.'
          });
        }, 500);
      }
    } catch (error) {
      console.error('Error creating/updating terminal:', error);
      setError(error.message || 'Error al agregar terminal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {terminalToEdit ? 'Editar Terminal' : 'Agregar Terminal'}
            </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className='grid grid-cols-1 gap-4' >
              <Input 
                type = "number"
                placeholder = "ID Terminal"
                value = {formData.idTerminal}
                onChange = {(e) => setFormData({ ...formData, idTerminal: e.target.value })}
                disabled = {terminalToEdit}
              />
              <Input 
                type = "text"
                placeholder = "Estado"
                value = {formData.state}
                onChange = {(e) => setFormData({ ...formData, state: e.target.value })}
              />
              <Input 
                type = "text"
                placeholder = "Dirección"
                value = {formData.address}
                onChange = {(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <Button 
              type = "submit"
              className = "w-full"  
              disabled = {loading}
            >
              {loading ? (
                "Procesando..."
              ) : terminalToEdit ? (
                <>
                  <Save className="mr-2 h-4 w-4" /> Actualizar Terminal
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Terminal
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };