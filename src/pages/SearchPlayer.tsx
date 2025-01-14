import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

const SearchPlayer: React.FC = () => {
  const [id, setId] = useState('');
  const [jugador, setJugador] = useState<any | null>(null);

  const handleSearch = async () => {
    try {
      // Construye la URL con el parámetro de búsqueda por ID
      const url = `http://localhost:5000/jugadores/${id}`;
      const response = await axios.get(url);
      setJugador(response.data); // Almacena el resultado en el estado
    } catch (error) {
      console.error( error);
      alert('Error al buscar jugador');
    }
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
                id: {jugador.id}<br />
                Edad: {jugador.edad} años<br />
                Dirección: {jugador.direccion}<br />
                Teléfono: {jugador.telefono}<br />
                Teléfono de Emergencia: {jugador.telefono_emergencia}<br />
                Año de Ingreso: {jugador.anio_ingreso}<br />
                Fecha de Nacimiento: {jugador.fecha_nacimiento}
              </IonCardContent>
            </IonCard>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchPlayer;