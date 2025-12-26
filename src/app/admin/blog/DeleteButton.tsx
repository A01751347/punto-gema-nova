'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { deletePost } from '@/lib/blog/actions';
// We might not have a toast library yet, so we'll use window.alert/confirm for now or simple UI feedback

export default function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de que deseas eliminar este artículo? Esta acción no se puede deshacer.')) {
            return;
        }

        startTransition(async () => {
            try {
                const result = await deletePost(id);
                if (!result.success) {
                    alert(result.message || 'Error al eliminar');
                }
            } catch (error) {
                alert('Error inesperado');
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            title="Eliminar"
        >
            <Trash2 size={18} />
        </button>
    );
}
