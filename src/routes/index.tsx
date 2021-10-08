import React from 'react';
import {Switch, Route} from 'react-router-dom';
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
    </Switch>
  );
};

export default Routes;
