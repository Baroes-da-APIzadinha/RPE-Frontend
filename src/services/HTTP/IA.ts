import { getRequest } from './requests';

const baseEndpoint = '/ia';

export async function getMiniAvaliarColaborador(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/miniavaliar/${idColaborador}/${idCiclo}`);
}

export async function getAvaliarColaborador(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/avaliar/${idColaborador}/${idCiclo}`);
}