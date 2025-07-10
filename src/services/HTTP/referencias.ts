// src/services/HTTP/referencias.ts

import type { CriarReferenciaPayload, AtualizarReferenciaPayload } from "@/types/Referencia";
import { postRequest, putRequest, deleteRequest, getRequest } from "./requests";

const baseEndpoint = "/referencias";

// Criar uma nova referência
export async function criarReferencia(payload: CriarReferenciaPayload) {
  return await postRequest(baseEndpoint, payload);
}

// Atualizar uma referência existente
export async function atualizarReferencia(idIndicacao: string, payload: AtualizarReferenciaPayload) {
  return await putRequest(`${baseEndpoint}/${idIndicacao}`, payload);
}

// Deletar uma referência existente
export async function deletarReferencia(id: string) {
  return await deleteRequest(`${baseEndpoint}/${id}`);
}

export async function listarReferenciasIndicadas(idIndicador: string) {
  return await getRequest(`${baseEndpoint}/indicador/${idIndicador}`);
}