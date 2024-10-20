import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Login from './pages/Login';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main-content">
        <Menu />
        <IonRouterOutlet id="main-content">
          <Route path="/home" component={Home} exact />
          <Route path="/game/:mode" component={Game} exact />
          <Route path="/about" component={About} exact />
          <Route path="/login" component={Login} exact />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
