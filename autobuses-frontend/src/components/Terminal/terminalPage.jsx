import React, { useState } from 'react';
import { TerminalForm } from './terminalForm';
import { TerminalTable } from './terminalTable';
import { Loading } from '../common/loaging';
import { ErrorMessage } from '../common/errorMessage';
import { useTerminals } from '../../hooks/useTerminals';
import { terminalService } from '../../services/terminalService';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const TerminalPage = () => {
  const { terminals, loading, error, fetchTerminals } = useTerminals();
  const [terminalToEdit, setTerminalToEdit] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await terminalService.delete(id);
      fetchTerminals();
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Terminal eliminada exitosamente.',
      });
    } catch (error) {
      console.error('Error deleting terminal:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo eliminar la terminal. Inténtalo de nuevo.',
      });
    }
  };

  const handleEdit = (terminal) => {
    setTerminalToEdit(terminal);
    setOpen(true);
  }

  const handleAdd = () => {
    setTerminalToEdit(null);
    setOpen(true);
  }

  const handleSuccess = () => {
    fetchTerminals();
    setTerminalToEdit(null);
  }


  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Terminal
        </Button>
      </div>
      <TerminalTable
        terminals={terminals}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TerminalForm
        open={open}
        onOpenChange={setOpen}
        onSuccess={handleSuccess}
        terminalToEdit={terminalToEdit}
      />
    </div>
  );
};