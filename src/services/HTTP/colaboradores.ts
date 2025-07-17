import { getRequest, postRequest, deleteRequest, putRequest, patchRequest } from './requests';

type UpdateColaboradorDto = {
  nomeCompleto?: string;
  email?: string;
  senha?: string;
  cargo?: string;
  trilhaCarreira?: string;
  unidade?: string;
};
// TODO: falar com eles sobre os endpoints

type CreateColaboradorDTO = {
  nomeCompleto: string;
  email: string;
  senha: string;
  cargo: string;
  trilhaCarreira: string;
  unidade: string;
};

export type AssociatePerfilDTO = {
  idColaborador: string;
  tipoPerfil: "COLABORADOR_COMUM" | "GESTOR" | "RH" | "MEMBRO_COMITE" | "ADMIN" | "LIDER" | "MENTOR";
};

type TrocarSenhaDto = {
  senhaAtual: string;
  novaSenha: string;
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

export async function deleteColaborador(id: string) {
  return await deleteRequest(`${baseEndpoint}/${id}`);
};

export async function getColaboradorById(id: string) {
  return await getRequest(`${baseEndpoint}/${id}`);
};

export async function getNotasHistorico(id: string) {
  return await getRequest(`${baseEndpoint}/notas/historico/${id}`);
}

export async function getColaboradorPilarNotas(id: string) {
  return await getRequest(`${baseEndpoint}/pilar/historico/${id}`);
}

export async function getCountAvaliacoesByColaborador(id: string) {
  return await getRequest(`${baseEndpoint}/avaliacoes-recebidas/${id}`);
}

export async function trocarSenhaPrimeiroLogin(id: string, data: TrocarSenhaDto) {
  return await patchRequest(`${baseEndpoint}/${id}/trocar-senha`, data);
}

export async function atualizarColaborador(id: string, data: UpdateColaboradorDto) {
  return await putRequest(`${baseEndpoint}/${id}`, data);
}

export async function getAllUsers() {
  return await getRequest(`auditoria/all-users`);
}

export async function associarPerfil(data: AssociatePerfilDTO) {
  return await postRequest(`${baseEndpoint}/associar-perfil`, data);
}

export async function desassociarPerfil(idColaborador: string, tipoPerfil: AssociatePerfilDTO['tipoPerfil']) {
  return await deleteRequest(`${baseEndpoint}/${idColaborador}/remover-perfil/${tipoPerfil}`);
}



