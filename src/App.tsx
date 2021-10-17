import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';

export default function App() {

  return (
    <Router>
      <div className="App">
        <img src="../img/high_voltage.png" alt="kwatts logo" width="64px"/>
        <h1>Kwatts</h1>
        <Routes/>
      </div>
    </Router>
  );

}