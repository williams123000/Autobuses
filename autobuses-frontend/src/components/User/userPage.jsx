import React, {useState} from "react";
import { UserForm } from "./userForm";
import { UserTable } from "./userTable";
import { Loading } from "../common/loaging";
import { ErrorMessage } from "../common/errorMessage";
import { useUsers } from "../../hooks/useUsers";
import { userService } from "../../services/userService";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const UserPage = () => {
    const { users, loading, error, fetchUsers } = useUsers();
    const [userToEdit, setUserToEdit] = useState(null);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id) => {
        try {
            await userService.delete(id);
            fetchUsers();
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Usuario eliminado exitosamente.",
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "No se pudo eliminar el usuario. Inténtalo de nuevo.",
            });
        }
    }

    const handleEdit = (user) => {
        setUserToEdit(user);
        setOpen(true);
    }

    const handleAdd = () => {
        setUserToEdit(null);
        setOpen(true);
    }

    const handleSuccess = () => {
        fetchUsers();
        setUserToEdit(null);
    }

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Agregar Usuario
                </Button>
            </div>

            <UserTable 
                users={users} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />

            <UserForm 
                open={open} 
                onOpenChange={setOpen} 
                onSuccess={handleSuccess} 
                userToEdit={userToEdit} 
            />
        </div>
    );
};