import React from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Menu: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem button onClick={() => navigateTo('/about')}>
              <IonLabel>About Us</IonLabel>
            </IonItem>
            <IonItem button onClick={() => navigateTo('/login')}>
              <IonLabel>Log In</IonLabel>
            </IonItem>
            <IonItem button onClick={() => navigateTo('/home')}>
              <IonLabel>Elegir Modo de Juego</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;