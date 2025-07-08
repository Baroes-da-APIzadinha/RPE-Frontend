import { deleteRequest, getRequest, patchRequest, postRequest } from "./requests";

export interface AssociacaoCriterioCiclo {
  idAssociacao: string;
  idCiclo: string;
  idCriterio: string;
  trilhaCarreira: string;
  unidade: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreateAssociacaoCriterioCicloDto {
  idCiclo: string;
  idCriterio: string;
  trilhaCarreira: string;
  unidade: string;
}

export interface UpdateAssociacaoCriterioCicloDto {
  trilhaCarreira?: string;
  unidade?: string;
}


const baseEndpoint = '/associacoes-criterio-ciclo';

export async function criarAssociacao(dto: CreateAssociacaoCriterioCicloDto): Promise<AssociacaoCriterioCiclo> {
  return await postRequest(baseEndpoint, dto);
}

export async function listarAssociacoes(): Promise<AssociacaoCriterioCiclo[]> {
  return await getRequest(baseEndpoint);
}

export async function buscarPorCiclo(idCiclo: string): Promise<AssociacaoCriterioCiclo[]> {
  return await getRequest(`${baseEndpoint}/ciclo/${idCiclo}`);
}

export async function buscarAssociacao(id: string): Promise<AssociacaoCriterioCiclo> {
  return await getRequest(`${baseEndpoint}/${id}`);
}

export async function atualizarAssociacao(id: string, dto: UpdateAssociacaoCriterioCicloDto): Promise<AssociacaoCriterioCiclo> {
  return await patchRequest(`${baseEndpoint}/${id}`, dto);
}

export async function removerAssociacao(id: string): Promise<void> {
  return await deleteRequest(`${baseEndpoint}/${id}`);
}