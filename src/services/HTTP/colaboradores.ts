import { getRequest, postRequest, deleteRequest } from './requests';

const baseEndpoint = '/colaboradores';

export const getColaboradores = async (params?: Record<string, any>) => {
  return await getRequest(baseEndpoint, params);
};

export const createColaborador = async (data: Record<string, any>) => {
  return await postRequest(baseEndpoint, data);
};


export const deleteColaborador = async (id: string) => {
  return await deleteRequest(`${baseEndpoint}/${id}`);
};

export const getColaboradorById = async (id: string) => {
  return await getRequest(`${baseEndpoint}/${id}`);
};

// Uso:
// Para buscar todos colaboradores:
// const allColaboradores = await getColaboradores();

// para buscar um colaborador por ID:
// const colaborador = await getColaboradorById('{id}');

// Para criar um novo colaborador:
// const newColaborador = await createColaborador({ name: 'John Doe', role: 'Developer' });


// Para deletar um colaborador:
// await deleteColaborador('{id}');