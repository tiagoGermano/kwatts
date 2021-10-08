import 'antd/dist/antd.css';
import { Button } from 'antd';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import {useHistory, } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
//  const {url} = useRouteMatch();
  
  const click = () => {
    history.push({
      pathname: '/registrar',
    });
  };

  return (
    <>
      <Button 
        type="primary"
        icon={<DashboardOutlined />}
        onClick={() => {click()}}>
          Registrar Leitura
      </Button>
      <Button 
        icon={<BarChartOutlined />} >
          Gráficos
      </Button>
    </>
  );

}