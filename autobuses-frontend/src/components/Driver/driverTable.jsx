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

export const DriverTable = ({ drivers, onDelete, onEdit }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Numero de Licencia</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Genero</TableHead>
                <TableHead>Fecha de Nacimiento</TableHead>
                <TableHead>Direccion</TableHead>
                <TableHead>Terminal</TableHead>
                <TableHead>Acciones</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {drivers.map((driver) => (
                <TableRow key={driver.idDriver}>
                    <TableCell>{driver.idDriver}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.lastName}</TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>{driver.lisenseNumber}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.gender}</TableCell>
                    <TableCell>{driver.birthdate}</TableCell>
                    <TableCell>{driver.address}</TableCell>
                    <TableCell>{driver.terminal.idTerminal}</TableCell>
                    <TableCell className="space-x-2 flex">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit(driver)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(driver.idDriver)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);