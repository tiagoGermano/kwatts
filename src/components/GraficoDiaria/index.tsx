import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { leituraService } from '../../service/datocmsService';
import compareDesc from 'date-fns/compareDesc'
import { Button, Spin } from 'antd';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { format } from 'date-fns';
import { useHistory } from 'react-router';

Chart.register(...registerables);

const GraficoDiario: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    
    const click = () => {
        history.push({
            pathname: '/',
        });

    };

    useEffect( () => {
        leituraService.consultarTodas(carregarGrafico);
    }, []);

    const comparaDatas = (leituraA: any, leituraB: any) => {
        return compareDesc(new Date(leituraA.dataMedicao), new Date(leituraB.dataMedicao));
    }

    const carregarGrafico = (leituras : [any]) =>{
        const ultimasLeituras = leituras.sort(comparaDatas).slice(0,8).reverse();

        const labels : string[]= [];
        const medicoes : number[]= [];

        for (let index = 0; index < ultimasLeituras.length -1; index++) {
            labels.push(format(new Date(ultimasLeituras[index].dataMedicao), 'dd/MM/yyyy'))
            medicoes.push(ultimasLeituras[index +1].valorMedicao - ultimasLeituras[index].valorMedicao)
        }

        const data = {
            labels: labels,
            datasets: [{
                label: 'Consumo ultimos 7 dias',
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                data: medicoes,
            }]
        };

        const config: ChartConfiguration = {
            type: 'line',
            data: data,
            options: {}
        };
        
        new Chart(
            document.getElementById('myChart'),
            config
            );
            
            
        setLoading(false);
    }  

    return (
        <>
            <Button 
                onClick={() => {click()}}
                icon={<HomeOutlined />}>
                Home
            </Button>
            <br/>
            <br/>
            <Spin spinning={loading}>
                <div className="chartContent">
                    <canvas id="myChart"></canvas>
                </div>
            </Spin>
        </>
    );
};

export default GraficoDiario;
