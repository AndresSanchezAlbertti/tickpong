import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const goToGame = (mode: string) => {
    // Navegar a la pantalla de juego con el modo seleccionado
    history.push(`/game/${mode}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modos de Juego</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Selecciona un modo de entrenamiento</h2>
        <IonButton expand="block" onClick={() => goToGame('modo1')}>
          Modo 1: Golpes Simples
        </IonButton>
        <IonButton expand="block" onClick={() => goToGame('modo2')}>
          Modo 2: Reacción Rápida
        </IonButton>
        <IonButton expand="block" onClick={() => goToGame('modo3')}>
          Modo 3: Golpes Aleatorios
        </IonButton>
        <IonButton expand="block" onClick={() => goToGame('modo4')}>
          Modo 4: Tiempo de Respuesta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;