import './App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { BarChartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {BrowserRouter as Router, Route, Link, useHistory, Switch} from 'react-router-dom';
import RegistroLeitura from './components/RegistroLeitura';
import Home from './Home';
import Routes from './routes';

export default function App() {
  const history = useHistory();
  console.log(history);
//  const {url} = useRouteMatch();
  
  const click = () => {
    history.push({
      pathname: '/usuarios/incluir',
    });
  };

  return (
    <Router>
      <div className="App">
        <h1>Kwatts</h1>
        <Routes/>
      </div>
    </Router>
  );

}