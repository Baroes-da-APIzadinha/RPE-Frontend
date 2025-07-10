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

  return await getRequest(`${baseEndpoint}/tipo/usuario/${idColaborador}`, params);
}

// Busca avaliações do tipo autoavaliação pelo ID do usuário
export async function getAutoAvaliacaoByUserId(userId: string) {
  return await getRequest(`${baseEndpoint}/tipo/usuario/${userId}?tipoAvaliacao=AUTOAVALIACAO`);
}

export async function getAvaliacaoParesByUserId(userId: string) {
  return await getRequest(`${baseEndpoint}/tipo/usuario/${userId}?tipoAvaliacao=AVALIACAO_PARES`);
}

// Busca os critérios da autoavaliação organizados por pilar
export async function getCriteriosAutoAvaliacao(idAvaliacao: string) {
  return await getRequest(`${baseEndpoint}/forms-autoavaliacao/${idAvaliacao}`);
}

export async function preencherAvaliacaoPares(data: Record<string, any>) {
  return await postRequest(`${baseEndpoint}/preencher-avaliacao-pares`, data);
}

export async function preencherAvaliacaoMentor(payload: {
  idAvaliacao: string;
  nota: number;
  justificativa: string;
}) {
  return await postRequest(`${baseEndpoint}/preencher-avaliacao-colaborador-mentor`, payload);
}

