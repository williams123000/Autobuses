import React, {useState} from 'react';
import { JourneyForm } from './journeyForm';
import { JourneyTable } from './journeyTable';
import { Loading} from '../common/loaging';
import { ErrorMessage } from '../common/errorMessage';
import { useJourneys } from '../../hooks/useJourneys';
import { journeyService } from '../../services/journeyService';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const JourneyPage = () => {
    const { journeys, loading, error, fetchJourneys } = useJourneys();
    const [journeyToEdit, setJourneyToEdit] = useState(null);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id) => {
        try {
            await journeyService.delete(id);
            fetchJourneys();
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Viaje eliminado exitosamente.'
            });
        } catch (error) {
            console.error('Error deleting journey:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'No se pudo eliminar el viaje. Inténtalo de nuevo.'
            });
        }
    };

    const handleEdit = (journey) => {
        setJourneyToEdit(journey);
        setOpen(true);
    }

    const handleAdd = () => {
        setJourneyToEdit(null);
        setOpen(true);
    }

    const handleSuccess = () => {
        fetchJourneys();
        setJourneyToEdit(null);
    }

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Agregar Viaje
                </Button>
            </div>

            <JourneyTable 
                journeys={journeys} 
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <JourneyForm 
                open={open}
                onOpenChange={setOpen}
                onSuccess={handleSuccess}
                journeyToEdit={journeyToEdit}
            />
        </div>
    );

};
