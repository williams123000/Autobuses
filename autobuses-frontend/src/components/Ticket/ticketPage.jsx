import React, {useState} from 'react';
import { TicketForm } from './ticketForm';
import { TicketTable } from './ticketTable';
import { Loading } from '../common/loaging';
import { ErrorMessage } from '../common/errorMessage';
import { useTickets } from '../../hooks/useTickets';
import { ticketService } from '../../services/ticketService';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const TicketPage = () => {
    const { tickets, loading, error, fetchTickets } = useTickets();

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="space-y-4">
            <TicketTable 
                tickets={tickets} 
            />
        </div>
    );
};