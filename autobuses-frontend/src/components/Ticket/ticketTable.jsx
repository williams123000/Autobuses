import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";

export const TicketTable = ({ tickets }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Viaje</TableHead>
                <TableHead>Usuario</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {tickets.map((ticket) => (
                <TableRow key={ticket.idTicket}>
                    <TableCell>{ticket.idTicket}</TableCell>
                    <TableCell>{ticket.journey.idJourney}</TableCell>
                    <TableCell>{ticket.user.name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);