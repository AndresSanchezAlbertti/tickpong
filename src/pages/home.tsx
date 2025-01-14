import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';

function Home() {
  interface Jugador {
    id: number;
    nombre: string;
    edad: number;
  }

  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/jugadores')
      .then(response => {
        setJugadores(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the jugadores!', error);
      });
  }, []);

  const handleAltasClick = () => {
    history.push('/add-player');
  };

  const handleBajasClick = () => {
    history.push('/search-player');
  };

  const handleModificacionesClick = () => {
    history.push('/search-player');
  };

  return (
    <div>
      <IonCard onClick={handleAltasClick}>
        <IonImg src="ruta/a/tu/imagen.jpg" alt="Descripción de la imagen" />
        <IonCardHeader>
          <IonCardTitle>ABM</IonCardTitle>
          <IonCardSubtitle>Altas</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          Desde aquí podes agregar jugadores
          <ul>
            {jugadores.map(jugador => (
              <li key={jugador.id}>{jugador.nombre} - {jugador.edad} años</li>
            ))}
          </ul>
        </IonCardContent>
      </IonCard>

      <IonCard onClick={handleBajasClick}>
        <IonImg src="ruta/a/tu/imagen.jpg" alt="Descripción de la imagen" />
        <IonCardHeader>
          <IonCardTitle>ABM</IonCardTitle>
          <IonCardSubtitle>Bajas</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          Desde aquí podes eliminar jugadores
          <ul>
            {jugadores.map(jugador => (
              <li key={jugador.id}>{jugador.nombre} - {jugador.edad} años</li>
            ))}
          </ul>
        </IonCardContent>
      </IonCard>

      <IonCard onClick={handleModificacionesClick}>
        <IonImg src="ruta/a/tu/imagen.jpg" alt="Descripción de la imagen" />
        <IonCardHeader>
          <IonCardTitle>ABM</IonCardTitle>
          <IonCardSubtitle>Modificaciones</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          Desde aquí podes modificar jugadores
          <ul>
            {jugadores.map(jugador => (
              <li key={jugador.id}>{jugador.nombre} - {jugador.edad} años</li>
            ))}
          </ul>
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default Home;
