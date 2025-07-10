export type TipoReferencia = "TECNICA" | "CULTURAL";

export type CriarReferenciaPayload = {
  idCiclo: string;
  idIndicador: string;
  idIndicado: string;
  tipo: TipoReferencia;
  justificativa: string;
};

export type AtualizarReferenciaPayload = {
    tipo: TipoReferencia;
    justificativa?: string;
}
