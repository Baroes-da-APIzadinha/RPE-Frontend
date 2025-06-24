import { getRequest, postRequest, deleteRequest, patchRequest } from './requests';

const baseEndpoint = '/criterios';

export async function getcriterios(params?: Record<string, any>) {
  return await getRequest(baseEndpoint, params);
};

export async function createCriterio(data: Record<string, any>) {
  return await postRequest(baseEndpoint, data);
};


export async function deleteCriterio(id: string) {
  return await deleteRequest(`${baseEndpoint}/${id}`);
};

export async function getCriterioById(id: string) {
  return await getRequest(`${baseEndpoint}/${id}`);
};

export async function updateCriterio(id: string, data: Record<string, any>) {
  return await patchRequest(`${baseEndpoint}/${id}`, data);
}

export async function getCriterioByPilar(pilar: string){
  return await getRequest(`${baseEndpoint}/pilar/${pilar}`)
}
