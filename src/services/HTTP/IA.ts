import { getRequest, postRequest } from './requests';

const baseEndpoint = '/ia';

export async function getMiniAvaliarColaborador(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/miniavaliar/${idColaborador}/${idCiclo}`);
}

export async function getAvaliarColaborador(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/avaliar/${idColaborador}/${idCiclo}`);
}

export async function getAvaliações(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/avaliacoes/${idColaborador}/${idCiclo}`);
}

export async function gerarBrutalFacts(idColaborador: string, idCiclo: string) {
  return await postRequest(`${baseEndpoint}/gerarbrutalfacts/${idColaborador}/${idCiclo}`, {});
}

export async function getBrutalFacts(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint}/brutalfacts/${idColaborador}/${idCiclo}`);
}