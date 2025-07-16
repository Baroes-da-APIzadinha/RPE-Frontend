// src/services/HTTP/avaliacoes.ts

import type { LideradosPorCicloResponse } from "@/types/AvaliacaoLider";
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

export async function preencherRascunhoAutoAvaliacao(payload: PreencherAutoAvaliacaoDto) {
  return await postRequest(`${baseEndpoint}/rascunho-auto-avaliacao`, payload);
}

// Avaliacao de pares (360)
export async function preencherAvaliacaoPares(payload: {
  idAvaliacao: string;
  nota: number;
  motivacao: string | undefined;
  pontosFortes: string;
  pontosFracos: string;
  status: 'EM_RASCUNHO' | 'CONCLUIDA';
}) {
  return await postRequest(`${baseEndpoint}/preencher-avaliacao-pares`, payload);
}

export async function preencherAvaliacaoMentor(payload: {
  idAvaliacao: string;
  nota: number;
  justificativa: string;
}) {
  return await postRequest(`${baseEndpoint}/preencher-avaliacao-colaborador-mentor`, payload);
}

// Lider endpoints

export async function getLideradosPorCiclo(
  idColaborador: string,
  idCiclo: string
): Promise<LideradosPorCicloResponse> {
  return await getRequest(`${baseEndpoint}/meus-liderados/${idColaborador}/${idCiclo}`);
}

export async function getAvaliacaoLiderByUserId(userId: string) {
  return await getRequest(`${baseEndpoint}/tipo/usuario/${userId}?tipoAvaliacao=LIDER_COLABORADOR`);
}

export async function getFormLiderColaborador(idAvaliacao: string) {
  return await getRequest(`${baseEndpoint}/forms-lider-colaborador/${idAvaliacao}`);
}

export async function preencherAvaliacaoLider(payload: PreencherAutoAvaliacaoDto) {
  return await postRequest(`${baseEndpoint}/preencher-lider-colaborador`, payload);
}

export async function preencherRascunhoLider(payload: PreencherAutoAvaliacaoDto) {
  return await postRequest(`${baseEndpoint}/rascunho-lider-colaborador`, payload);
}

