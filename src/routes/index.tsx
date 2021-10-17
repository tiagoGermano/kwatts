import React from 'react';
import {Switch, Route} from 'react-router-dom';
import GraficoDiario from '../components/GraficoDiaria';
import RegistroLeitura from '../components/RegistroLeitura';
import Home from '../Home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/registrar" exact>
        <RegistroLeitura />
      </Route>
      <Route path="/graficos" exact>
        <GraficoDiario />
      </Route>
    </Switch>
  );
};

export default Routes;
