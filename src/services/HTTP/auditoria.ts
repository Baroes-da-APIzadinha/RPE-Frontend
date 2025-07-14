import { getRequest } from "./requests";

export interface LogAuditoria {
    id: string;
    userId: string;
    action: string;
    resource: string;
    details: Record<string, any>; 
    timestamp: string;
    ip: string;
}

export async function getLogsAuditoria(){
  return await getRequest("/auditoria");
}