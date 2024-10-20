import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import MQTTService from '../services/mqttService';  // Importar el servicio MQTT
import './Game.css';
interface Plate {
  id: number;
  ledOn: boolean;
  hitDetected: boolean;
}

const Game: React.FC = () => {
  const [plates, setPlates] = useState<Plate[]>(Array(8).fill({ id: 0, ledOn: false, hitDetected: false }));

  useEffect(() => {
    // Iniciar el servicio MQTT al cargar el componente
    MQTTService;

    // Escuchar los mensajes de los golpes detectados
    const handleMessage = (topic: string, message: string) => {
      if (topic === 'arduino/hit') {
        const plateId = parseInt(message.split(' ')[1], 10);  // Asumiendo que el mensaje es "Placa X golpeada"
        setPlates(prev =>
          prev.map((plate, index) =>
            index + 1 === plateId ? { ...plate, hitDetected: true } : plate
          )
        );
      }
    };

    return () => {
      // Limpiar cualquier evento cuando el componente se desmonte
    };
  }, []);

  const startGameMode = (mode: string) => {
    // Publicar el modo de juego seleccionado a los Arduinos
    MQTTService.publish('arduino/mode', mode);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Juego</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          {plates.map((plate, index) => (
            <div key={index}>
              <h3>Placa {index + 1}</h3>
              <p>Golpe Detectado: {plate.hitDetected ? 'Sí' : 'No'}</p>
            </div>
          ))}
        </div>
        <IonButton expand="block" onClick={() => startGameMode('modo1')}>Iniciar Modo 1</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Game;