import moment from "moment";
const { DATO_CMS_TOKEN } = process.env;

const { SiteClient} = require('datocms-client');

const TOKEN = DATO_CMS_TOKEN;
const client = new SiteClient(TOKEN);
const medicaoItemType = '1244651';

const toISOString = function() {
    const data = new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
    const hora = new Date().toLocaleTimeString('pt-br');

    return data +'T' + hora;
  };
  
async function registrarLeitura(leitura: number) {
    const created = await client.items.create({
      itemType: medicaoItemType,
      data_medicao: toISOString(),
      valor_medicao: leitura
    });
  
    return created;
}

function listarLeituras(callback: Function) {
    const leituras = client.items.all().then(callback)
}

export const leituraService = {
    registar : registrarLeitura,
    consultarTodas : listarLeituras
}