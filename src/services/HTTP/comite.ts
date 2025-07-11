import { getRequest } from './requests';

const baseEndpoint1 = '/avaliacoes/';

export async function getNotasCiclo(id: string) {
  return await getRequest(`${baseEndpoint1}notasCiclo/${id}`);
}

export async function getNotasAvaliacoes(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint1}notasAvaliacoes/${idColaborador}/${idCiclo}`);
}