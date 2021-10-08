import './registroLeitura.css';
import React, { useEffect, useState } from 'react';
import { BarChartOutlined, SaveOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { leituraService } from '../../service/datocmsService';
import compareDesc from 'date-fns/compareDesc'
import { Button, Modal } from 'antd';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { format } from 'date-fns';

Chart.register(...registerables);

const RegistroLeitura: React.FC = () => {
    const [leitura, setLeitura] = useState(0);
    const [relogio, setRelogio] = useState('000000000');
    const [chartLabel, setChartLabel] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);

    
    const click = () => {
        // history.push({
            //     pathname: '/',
            // });

            const data = {
                labels: chartLabel,
                datasets: [{
                    label: 'Consumo ultimos 7 dias',
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    data: chartData,
                }]
            };

        const config: ChartConfiguration = {
            type: 'line',
            data: data,
            options: {}
        };
        
        var myChart = new Chart(
            document.getElementById('myChart'),
            config
        );


    };

    // const atualiarRelogio = () => {
    //     const leituraFormatada = leitura.padStart(9, '0');
    //     setLeitura(leituraFormatada)
    // }

    const incrementarRelogio = () => {
        setLeitura(leitura + 1);
    }

    const decrementarRelogio = () => {
        setLeitura(leitura - 1);
    }

    const registrarLeitura = async () => {
        const novaLeitura = await leituraService.registar(leitura);
        Modal.success({
            content: 'Leitura registrado com sucesso !',
        })
    }
    
    useEffect(() => {
        const novaLeituraRelogio = leitura.toString().padStart(9, '0');
        setRelogio(novaLeituraRelogio)
    }, [leitura]);

    useEffect( () => {
        leituraService.consultarTodas(carregarUltimaLeitura);
    }, []);

    const comparaDatas = (leituraA: any, leituraB: any) => {
        return compareDesc(new Date(leituraA.dataMedicao), new Date(leituraB.dataMedicao));
    }

    const carregarUltimaLeitura = (leituras : [any]) =>{
        const ultimasLeituras = leituras.sort(comparaDatas).slice(0,8).reverse();
        const ultimaLeitura = ultimasLeituras[ultimasLeituras.length -1].valorMedicao;

        const labels : string[]= [];
        const medicoes : number[]= [];

        for (let index = 0; index < ultimasLeituras.length -1; index++) {
            labels.push(format(new Date(ultimasLeituras[index].dataMedicao), 'dd/MM/yyyy'))
            medicoes.push(ultimasLeituras[index +1].valorMedicao - ultimasLeituras[index].valorMedicao)
        }

        setLeitura(ultimaLeitura);
        setChartLabel(labels);
        setChartData(medicoes);
    }

    return (
        <>
            {/* <Input type="number" value={relogio} min={0} maxLength={9}></Input> */}
            {/* <Button onClick={atualiarRelogio}>clickme</Button> */}
            <h3>Registrar Leitura</h3>
            <div className="relogio">
                <MinusCircleOutlined className="btnAcaoRelogio" onClick={decrementarRelogio}/>
                    {
                        relogio.split('').map( (digito) => {
                            return <span className="digito">{digito}</span>
                        })
                    }
                <PlusCircleOutlined className="btnAcaoRelogio" onClick={incrementarRelogio}/>
            </div>
            <br/>
            <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={registrarLeitura}>
                Registrar
            </Button>
            <Button 
                onClick={() => {click()}}
                icon={<BarChartOutlined />}>
                Grafico
            </Button>
            <br/>
            <br/>
            <div className="chartContent">
                <canvas id="myChart"></canvas>
            </div>
        </>
    );
};

export default RegistroLeitura;
