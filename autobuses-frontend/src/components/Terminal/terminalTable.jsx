import React from 'react';
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

export const TerminalTable = ({ terminals, onDelete, onEdit }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Estado</TableHead>
        <TableHead>Dirección</TableHead>
        <TableHead>Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {terminals.map((terminal) => (
        <TableRow key={terminal.idTerminal}>
          <TableCell>{terminal.idTerminal}</TableCell>
          <TableCell>{terminal.state}</TableCell>
          <TableCell>{terminal.address}</TableCell>
          <TableCell className="space-x-2 flex">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(terminal)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(terminal.idTerminal)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);