import React from 'react';
import { IonRow, IonCol, IonButton } from '@ionic/react';

type Player = {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  edad: number;
  anio_ingreso: number;
  direccion?: string;
  telefono?: string;
  telefono_emergencia?: string;
};

interface PlayersTableProps {
  players: Player[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const PlayersTable: React.FC<PlayersTableProps> = ({ players, onEdit, onDelete }) => {
  return (
    <table>
      <IonRow>
        <IonCol>ID</IonCol>
        <IonCol>Nombre</IonCol>
        <IonCol>Apellido</IonCol>
        <IonCol>Fecha de Nacimiento</IonCol>
        <IonCol>Edad</IonCol>
        <IonCol>Año de Ingreso</IonCol>
        <IonCol>Teléfono</IonCol>
        <IonCol>Tel. Emergencia</IonCol>
        <IonCol>Acciones</IonCol>
      </IonRow>
      {players.map((player) => (
        <IonRow key={player.id}>
          <IonCol>{player.id}</IonCol>
          <IonCol>{player.nombre}</IonCol>
          <IonCol>{player.apellido}</IonCol>
          <IonCol>{player.fecha_nacimiento}</IonCol>
          <IonCol>{player.edad}</IonCol>
          <IonCol>{player.anio_ingreso}</IonCol>
          <IonCol>{player.telefono}</IonCol>
          <IonCol>{player.telefono_emergencia}</IonCol>
          <IonCol>
            <IonButton size="small" color="primary" onClick={() => onEdit(player.id)}>
              Editar
            </IonButton>
            <IonButton size="small" color="danger" onClick={() => onDelete(player.id)}>
              Eliminar
            </IonButton>
          </IonCol>
        </IonRow>
      ))}
    </table>
  );
};

export default PlayersTable;