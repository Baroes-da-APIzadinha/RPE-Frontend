import { getRequest, patchRequest } from './requests';

const baseEndpoint1 = '/avaliacoes/';
const baseEndpoint2 = '/equalizacao/';

export async function getNotasCiclo(id: string) {
  return await getRequest(`${baseEndpoint1}notasCiclo/${id}`);
}

export async function getNotasAvaliacoes(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint1}notasAvaliacoes/${idColaborador}/${idCiclo}`);
}

export async function getEqualizacaoColaborador(idColaborador: string, idCiclo: string) {
  return await getRequest(`${baseEndpoint2}avaliado/${idColaborador}/${idCiclo}`);
}

export async function sendEqualizacao(
  idEqualizacao: string,
  notaAjustada: number,
  justificativa: string,
  status: string
) 
{
  return await patchRequest(`${baseEndpoint2}/${idEqualizacao}`, 
    {
      notaAjustada: notaAjustada, 
      justificativa: justificativa, 
      status: status
    });

}
