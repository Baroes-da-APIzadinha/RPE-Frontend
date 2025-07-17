import { getRequest } from './requests';

export async function getMentorados(idMentor: string, idCiclo: string) {
  return await getRequest(`colaborador/mentorados/${idMentor}/${idCiclo}`);
}

export async function getBrutalFacts(mentoradoId: string) {
  return await getRequest(`colaborador/brutal-facts/${mentoradoId}`);
}