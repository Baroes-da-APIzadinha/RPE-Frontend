import { getRequest } from "./requests";


export async function getCollaboratorsCount(idCiclo: string) {
    return await getRequest(`colaboradores/ciclo/${idCiclo}`);
}

export async function getAvaliationsAwneredCount(idCiclo: string) {
    return await getRequest(`avaliacoes/concluidas/ciclo/${idCiclo}`);
}

export async function getUnits(){
    return await getRequest(`unidades`);
}

export async function getAvaliationsStatusPerCycle(idCiclo: string) {
    return await getRequest(`avaliacoes/status/${idCiclo}`);
}

export async function getConclusionProgressByUnit(idCiclo: string) {
    return await getRequest(`progresso/unidade/ciclo/${idCiclo}`);
}

export async function getConclusionProgressByBoard(idCiclo: string) {
    return await getRequest(`progresso/trilha/ciclo/${idCiclo}`);
}
