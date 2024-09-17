import React, { useState, useEffect } from 'react';

import AlbumCard from '../components/editarAlbum/AlbumCard';
import AddAlbumDialog from '../components/editarAlbum/AddAlbumDialog';
import EditAlbumDialog from '../components/editarAlbum/EditAlbumDialog';
import DeleteAlbumDialog from '../components/editarAlbum/DeleteAlbumDialog';

// Datos de ejemplo (en una aplicación real, esto vendría de una API o base de datos)
const initialAlbums = [
    { id: 1, name: 'Vacaciones 2023', imageCount: 15 },
    { id: 2, name: 'Cumpleaños', imageCount: 8 },
    { id: 3, name: 'Mascotas', imageCount: 20 },
];

const AlbumEdit = () => {
    const [albums, setAlbums] = useState(initialAlbums);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const handleAddAlbum = () => {
        if (newAlbumName.trim() !== '') {
            const newAlbum = {
                id: albums.length + 1,
                name: newAlbumName.trim(),
                imageCount: 0
            };
            setAlbums([...albums, newAlbum]);
            setNewAlbumName('');
            setIsAddDialogOpen(false);
        }
    };

    const handleEditAlbum = () => {
        if (selectedAlbum && newAlbumName.trim() !== '') {
            const updatedAlbums = albums.map(album =>
                album.id === selectedAlbum.id ? { ...album, name: newAlbumName.trim() } : album
            );
            setAlbums(updatedAlbums);
            setNewAlbumName('');
            setIsEditDialogOpen(false);
        }
    };

    const handleDeleteAlbum = () => {
        if (selectedAlbum) {
            const updatedAlbums = albums.filter(album => album.id !== selectedAlbum.id);
            setAlbums(updatedAlbums);
            setIsDeleteDialogOpen(false);
        }
    };


    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Editar Álbumes</h1>
                    <button onClick={() => setIsAddDialogOpen(true)} className="btn btn-dark">
                        Agregar Álbum
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {albums.map((album) => (
                        <AlbumCard
                            key={album.id}
                            album={album}
                            onEdit={() => {
                                setSelectedAlbum(album);
                                setNewAlbumName(album.name);
                                setIsEditDialogOpen(true);
                            }}
                            onDelete={() => {
                                setSelectedAlbum(album);
                                setIsDeleteDialogOpen(true);
                            }}
                        />
                    ))}
                </div>

                <AddAlbumDialog
                    isOpen={isAddDialogOpen}
                    onClose={() => setIsAddDialogOpen(false)}
                    newAlbumName={newAlbumName}
                    setNewAlbumName={setNewAlbumName}
                    handleAddAlbum={handleAddAlbum}
                />

                <EditAlbumDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    newAlbumName={newAlbumName}
                    setNewAlbumName={setNewAlbumName}
                    handleEditAlbum={handleEditAlbum}
                />

                <DeleteAlbumDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    albumName={selectedAlbum?.name}
                    handleDeleteAlbum={handleDeleteAlbum}
                />
            </div>
        </>
    );
};

export default AlbumEdit;
