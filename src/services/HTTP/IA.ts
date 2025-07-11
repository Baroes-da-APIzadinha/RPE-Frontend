import { getRequest } from './requests';

const baseEndpoint = '/ia';

export async function getMiniAvaliarColaborador(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/miniavaliar/${idColaborador}/${idCiclo}`);
}