// src/services/HTTP/avaliacoes.ts

import { getRequest, postRequest } from "./requests";

export interface CriterioPreenchido {
  nome: string;
  nota: number;
  justificativa: string;
}

export interface PreencherAutoAvaliacaoDto {
  idAvaliacao: string;
  criterios: CriterioPreenchido[];
}

const baseEndpoint= "/avaliacoes"

export async function preencherAutoAvaliacao(payload: PreencherAutoAvaliacaoDto) {
  return await postRequest(`${baseEndpoint}/preencher-auto-avaliacao`, payload);
}

export async function getAvaliacoesPorTipoUsuario(
  idColaborador: string,
  tipoAvaliacao: string,
  idCiclo?: string
) {
  const params: Record<string, string> = { tipoAvaliacao };
  if (idCiclo) params.idCiclo = idCiclo;

  return await getRequest(`/avaliacoes/tipo/usuario/${idColaborador}`, params);
}

export async function preencherAvaliacaoPares(data: Record<string, any>) {
  return await postRequest(`${baseEndpoint}/preencher-avaliacao-pares`, data);
}
