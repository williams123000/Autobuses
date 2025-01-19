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

export const JourneyTable = ({ journeys, onDelete, onEdit }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Asientos Disponibles</TableHead>
                <TableHead>Fecha de Salida</TableHead>
                <TableHead>Hora de Salida</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Autobús</TableHead>
                <TableHead>Conductor</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Acciones</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {journeys.map((journey) => (
                <TableRow key={journey.idJourney}>
                    <TableCell>{journey.idJourney}</TableCell>
                    <TableCell>{journey.seatsAvailable}</TableCell>
                    <TableCell>{journey.deapartureDate}</TableCell>
                    <TableCell>{journey.deapartureTime}</TableCell>
                    <TableCell>{journey.price}</TableCell>
                    <TableCell>{journey.bus.idBus}</TableCell>
                    <TableCell>{journey.driver.name} {journey.driver.lastName} </TableCell>
                    <TableCell>{journey.origin.state} {journey.origin.address}</TableCell>
                    <TableCell>{journey.destination.state} {journey.destination.address}</TableCell>
                    <TableCell className="space-x-2 flex">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(journey)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(journey.idJourney)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);