import { getRequest, postRequest, deleteRequest } from './requests';
// TODO: falar com eles sobre os endpoints

const baseEndpoint = '/colaborador';

export async function getColaboradores(params?: Record<string, any>) {
  return await getRequest(baseEndpoint, params);
};

export async function createColaborador(data: Record<string, any>) {
  return await postRequest(baseEndpoint, data);
};


export async function deleteColaborador(id: string) {
  return await deleteRequest(`${baseEndpoint}/${id}`);
};

export async function getColaboradorById(id: string) {
  return await getRequest(`${baseEndpoint}/${id}`);
};


