export type Status = 'PENDENTE' | 'EM_RASCUNHO' | 'CONCLUIDA';

export interface Liderado {
  idAvaliacaoLider: string; 
  idColaborador: string;
  nomeCompleto: string;
  cargo: string | null;
  notaAutoavaliacao: number | string | null;
  notaLider: number | string | null;
  statusAutoavaliacao: Status;
  statusAvaliacao360: Status;
}

export interface Avaliador {
  id: string;
  nomeLider: string;
}

export interface LideradosPorCicloResponse {
  avaliador: Avaliador;
  liderados: Liderado[];
}

export interface CriterioForm {
  nomeCriterio: string;
  descricao: string;
}

export interface Avaliacao {
  idAvaliado: string;
  idAvaliacao: string;
  status: Status;
  avaliacaoLiderColaborador?: {
    cardAvaliacaoLiderColaborador?: {
      nomeCriterio: string;
      nota: string;
      justificativa: string;
    }[];
  };
}

export interface AvaliacoesResponse {
  avaliacoes: Avaliacao[];
}

export type FormularioLiderColaborador = Record<string, CriterioForm[]>;
