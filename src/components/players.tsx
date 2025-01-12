import { Player } from './player';
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import PlayersTable from './PlayersTable';

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      fecha_nacimiento: '1990-05-20',
      edad: 33,
      anio_ingreso: 2015,
      direccion: 'Calle Falsa 123',
      telefono: '123456789',
      telefono_emergencia: '987654321',
    },
  ]);

  const handleEdit = (id: number) => {
    console.log('Edit player:', id);
  };

  const handleDelete = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ABM de Jugadores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" color="primary">
          Agregar Jugador
        </IonButton>
        <PlayersTable players={players} onEdit={handleEdit} onDelete={handleDelete} />
      </IonContent>
    </IonPage>
  );
};

export default Players;