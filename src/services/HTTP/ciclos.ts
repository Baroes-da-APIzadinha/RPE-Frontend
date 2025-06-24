import { getRequest, postRequest, deleteRequest, patchRequest } from './requests';

const baseEndpoint = '/ciclo';

export async function getCiclos(params?: Record<string, any>) {
  return await getRequest(`${baseEndpoint}/get-all`, params);
};

export async function createCiclo(data: Record<string, any>) {
  return await postRequest(baseEndpoint, data);
};

export async function updateCiclo(id: string, data: Record<string, any>) {
  return await patchRequest(`${baseEndpoint}/${id}`, data);
};

export async function deleteCiclo(id: string) {
  return await deleteRequest(`${baseEndpoint}/${id}`);
};

export async function getCicloById(id: string) {
  return await getRequest(`${baseEndpoint}/${id}`);
};

export async function getCicloAtivos() {
    return await getRequest(`${baseEndpoint}/get-ativos`);
}

export async function getCicloHistorico() {
    return await getRequest(`${baseEndpoint}/get-historico`);
} 
