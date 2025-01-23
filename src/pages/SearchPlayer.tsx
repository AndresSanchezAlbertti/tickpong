import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const SearchPlayer: React.FC = () => {
  const [id, setId] = useState('');
  const [jugador, setJugador] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSearch = async () => {
    try {
      // Construye la URL con el parámetro de búsqueda por ID
      const url = `http://localhost:5000/jugadores/${id}`;
      const response = await axios.get(url);
      setJugador(response.data); // Almacena el resultado en el estado
      setError(null); // Limpiar cualquier error previo
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        setError('Jugador no encontrado');
      } else {
        console.error('Error al buscar jugador', error);
        setError('Error al buscar jugador');
      }
      setJugador(null); // Limpiar cualquier jugador previo
    }
  };

  const handleDelete = async () => {
    try {
      const url = `http://localhost:5000/jugadores/${id}`;
      await axios.delete(url);
      alert('Jugador eliminado exitosamente');
      setJugador(null); // Limpiar el jugador después de eliminarlo
    } catch (error) {
      console.error('Error al eliminar jugador', error);
      alert('Error al eliminar jugador');
    }
  };

  const handleEdit = () => {
    history.push(`/edit-player/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar Jugador</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">ID del Jugador</IonLabel>
          <IonInput value={id} onIonChange={e => setId(e.detail.value!)} />
        </IonItem>
        <IonButton expand="full" onClick={handleSearch}>Buscar</IonButton>
        {error && (
          <IonItem color="danger">
            <IonLabel>{error}</IonLabel>
          </IonItem>
        )}
        {jugador && (
          <IonList>
            <IonListHeader>
              <IonLabel>Detalles del Jugador</IonLabel>
            </IonListHeader>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{jugador.nombre} {jugador.apellido}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Edad: {jugador.edad} años<br />
                Dirección: {jugador.direccion}<br />
                Teléfono: {jugador.telefono}<br />
                Teléfono de Emergencia: {jugador.telefono_emergencia}<br />
                Año de Ingreso: {jugador.anio_ingreso}<br />
                Fecha de Nacimiento: {jugador.fecha_nacimiento}
              </IonCardContent>
              <IonButton expand="full" color="danger" onClick={handleDelete}>Eliminar</IonButton>
              <IonButton expand="full" color="primary" onClick={handleEdit}>Editar Jugador</IonButton>
            </IonCard>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchPlayer;