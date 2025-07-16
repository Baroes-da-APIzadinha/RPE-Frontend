import { postRequest, patchRequest } from './requests';

const baseEndpoint = '/admin';

export async function forceERPSync() {
  return await postRequest(`sincronizacao`, {});
}

export async function updateCycleStatus(idCiclo: string, status: string) {
  return await patchRequest(`${baseEndpoint}/ciclo/${idCiclo}/status`, { status });
}

export async function changeStatus(idCiclo: string, current_status: string, next_status: string) {
  return await patchRequest(`ciclo/status`, { 
    idCiclo, 
    current_status, 
    next_status 
  });
}
