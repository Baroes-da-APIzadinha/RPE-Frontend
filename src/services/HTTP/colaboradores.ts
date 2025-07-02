import { getRequest, postRequest, deleteRequest } from './requests';
// TODO: falar com eles sobre os endpoints

type CreateColaboradorDTO = {
  nomeCompleto: string;
  email: string;
  senha: string;
  cargo: string;
  trilhaCarreira: string;
  unidade: string;
};

type AssociatePerfilDTO = {
  idColaborador: string;
  tipoPerfil: "COLABORADOR_COMUM" | "GESTOR" | "RH" | "MEMBRO_COMITE" | "ADMIN";
};


const baseEndpoint = '/colaborador';

export async function getColaboradores(params?: Record<string, any>) {
  return await getRequest(baseEndpoint, params);
};

export async function getListColaboradores() {
  return await getRequest(`${baseEndpoint}/get-all-colaboradores`);
};

// Cargo, Trilhas e Unidades
export async function getColaboradorConstantes() {
  return await getRequest(`${baseEndpoint}/constantes`);
}

export async function criarColaborador(data: CreateColaboradorDTO) {
  return await postRequest(baseEndpoint, data);
}

export async function associarPerfil(data: AssociatePerfilDTO) {
  return await postRequest(`${baseEndpoint}/associar-perfil`, data);
}

export async function deleteColaborador(id: string) {
  return await deleteRequest(`${baseEndpoint}/${id}`);
};

export async function getColaboradorById(id: string) {
  return await getRequest(`${baseEndpoint}/${id}`);
};



