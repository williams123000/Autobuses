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

export const BusTable = ({ buses, onDelete, onEdit }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Número de Asientos</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Terminal</TableHead>
                <TableHead>Acciones</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {buses.map((bus) => (
                <TableRow key={bus.idBus}>
                    <TableCell>{bus.idBus}</TableCell>
                    <TableCell>{bus.numSeating}</TableCell>
                    <TableCell>{bus.tuition}</TableCell>
                    <TableCell>{bus.brand}</TableCell>
                    <TableCell>{bus.model}</TableCell>
                    <TableCell>{bus.terminal.idTerminal}</TableCell>
                    <TableCell className="space-x-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(bus)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(bus.idBus)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);