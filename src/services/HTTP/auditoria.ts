import { getRequest } from "./requests";

export interface LogAuditoria {
    dataHora: string;
    usuario: string;
    acao: string;
    endpoint: string;
}

export interface LogAuditoriaResponse {
    logs: LogAuditoria[];
}

const baseEndpoint = "/auditoria";

export async function getLogsAuditoria(inicio: number, fim?: number): Promise<LogAuditoriaResponse> {
  return await getRequest(`${baseEndpoint}/logs?inicio=${inicio}${fim ? `&fim=${fim}` : ''}`);
}