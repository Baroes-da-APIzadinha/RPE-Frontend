import { getRequest } from "./requests";

const baseEndpoint = '/rh';

export async function getCollaboratorsCount(idCiclo: string) {
    return await getRequest(`${baseEndpoint}/colaboradores/ciclo/${idCiclo}`);
}

export async function getAvaliationsAwneredCount(idCiclo: string) {
    return await getRequest(`${baseEndpoint}/avaliacoes/concluidas/ciclo/${idCiclo}`);
}

export async function getUnits(){
    return await getRequest(`${baseEndpoint}/unidades`);
}

export async function getAvaliationsStatusPerCycle(idCiclo: string) {
    return await getRequest(`${baseEndpoint}/avaliacoes/status/${idCiclo}`);
}

export async function getConclusionProgressByUnit(idCiclo: string) {
    return await getRequest(`${baseEndpoint}/progresso/unidade/ciclo/${idCiclo}`);
}

export async function getConclusionProgressByBoard(idCiclo: string) {
    return await getRequest(`${baseEndpoint}/progresso/trilha/ciclo/${idCiclo}`);
}
