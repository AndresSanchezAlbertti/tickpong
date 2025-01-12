import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';

const AddPlayer: React.FC = () => {
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoEmergencia, setTelefonoEmergencia] = useState('');
  const [anioIngreso, setAnioIngreso] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !apellido || !fechaNacimiento || !edad || !anioIngreso || !direccion || !telefono || !telefonoEmergencia) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/jugadores', {
        nombre,
        apellido,
        fecha_nacimiento: fechaNacimiento,
        edad: parseInt(edad),
        anio_ingreso: parseInt(anioIngreso),
        direccion,
        telefono,
        telefono_emergencia: telefonoEmergencia
      });
      alert('Jugador agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar el jugador', error);
      alert('Error al agregar el jugador');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Jugador</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput value={apellido} onIonChange={e => setApellido(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Fecha de Nacimiento</IonLabel>
            <IonInput type="date" value={fechaNacimiento} onIonChange={e => setFechaNacimiento(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Edad</IonLabel>
            <IonInput type="number" value={edad} onIonChange={e => setEdad(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Año de Ingreso</IonLabel>
            <IonInput type="number" value={anioIngreso} onIonChange={e => setAnioIngreso(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Dirección</IonLabel>
            <IonInput value={direccion} onIonChange={e => setDireccion(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput value={telefono} onIonChange={e => setTelefono(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Teléfono de Emergencia</IonLabel>
            <IonInput value={telefonoEmergencia} onIonChange={e => setTelefonoEmergencia(e.detail.value!)} required />
          </IonItem>
          <IonButton expand="full" type="submit">Agregar Jugador</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddPlayer;