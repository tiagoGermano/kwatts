import './registroLeitura.css';
import React, { useEffect, useState } from 'react';
import { HomeOutlined, SaveOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { leituraService } from '../../service/datocmsService';
import compareDesc from 'date-fns/compareDesc'
import differenceInDays from 'date-fns/differenceInDays'
import { Button, Modal, Spin } from 'antd';
import { format } from 'date-fns';
import { useHistory } from 'react-router';

const RegistroLeitura: React.FC = () => {
    const history = useHistory();
    const [leitura, setLeitura] = useState(0);
    const [relogio, setRelogio] = useState('000000000');
    const [loading, setLoading] = useState(true);
    const [ultimaLeitura, setUltimaLeitura] = useState(0);
    const [dataUltimoRegistro, setDataUltimoRegistro] = useState(null);

    
    const click = () => {
        history.push({
                pathname: '/',
            });
    };

    const incrementarRelogio = () => {
        setLeitura(leitura + 1);
    }

    const decrementarRelogio = () => {
        if(leitura > ultimaLeitura){
            setLeitura(leitura - 1);
        }
    }

    const registrarLeitura = async () => {
        if(dataUltimoRegistro){
            if(differenceInDays(new Date(), new Date(dataUltimoRegistro)) > 0){
                const novaLeitura = await leituraService.registar(leitura);
                setUltimaLeitura(novaLeitura.valorMedicao);
                setDataUltimoRegistro(novaLeitura.dataMedicao);
                Modal.success({
                    content: 'Leitura registrado com sucesso!',
                });
            } else {
                Modal.warn({
                    content: 'Só permitido uma leitura por dia.',
                })
            }
        }
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
        const ultimoRegistro = ultimasLeituras[ultimasLeituras.length -1].valorMedicao;
        const ultimaData = ultimasLeituras[ultimasLeituras.length -1].dataMedicao;

        const labels : string[]= [];
        const medicoes : number[]= [];

        for (let index = 0; index < ultimasLeituras.length -1; index++) {
            labels.push(format(new Date(ultimasLeituras[index].dataMedicao), 'dd/MM/yyyy'))
            medicoes.push(ultimasLeituras[index +1].valorMedicao - ultimasLeituras[index].valorMedicao)
        }

        setLeitura(ultimoRegistro);
        setUltimaLeitura(ultimoRegistro);
        setDataUltimoRegistro(ultimaData);
        setLoading(false);
    }

    return (
        <>
            <h3>Registrar Leitura</h3>
            <Spin spinning={loading}>
                <div className="relogio">
                    <MinusCircleOutlined className="btnAcaoRelogio" onClick={decrementarRelogio}/>
                        {
                            relogio.split('').map( (digito, index) => {
                                return <span key={index} className="digito">{digito}</span>
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
                    icon={<HomeOutlined />}>
                    Home
                </Button>
            </Spin>
            <br/>
            <br/>
            <div className="chartContent">
                <canvas id="myChart"></canvas>
            </div>
        </>
    );
};

export default RegistroLeitura;
