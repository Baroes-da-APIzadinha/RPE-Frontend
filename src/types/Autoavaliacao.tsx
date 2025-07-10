export type CardAutoAvaliacao = {
  idCardAvaliacao: string;
  idAvaliacao: string;
  nomeCriterio: string;
  nota: string;
  justificativa: string;
};

export type AutoAvaliacao = {
  idAvaliacao: string;
  notaFinal: string;
  cardAutoAvaliacoes: CardAutoAvaliacao[];
};

export type AvaliacaoResponse = {
  idAvaliacao: string;
  tipoAvaliacao: "AUTOAVALIACAO";
  status: string;
  idAvaliador: string;
  idAvaliado: string;
  autoAvaliacao: AutoAvaliacao | null;
};

export type RespostaAutoAvaliacao = {
  nomeCriterio: string;
  nota: number;
  justificativa: string;
};

export type UseAutoAvaliacaoIdReturn = {
  idAvaliacao: string | null;
  respostas: RespostaAutoAvaliacao[] | null;
  loading: boolean;
};


export type AutoAvaliacaoApiResponse = {
  success: boolean;
  count: number;
  tipoFiltrado: string;
  avaliacoes: AvaliacaoResponse[];
};

export type Criterio = {
  nomeCriterio: string;
  descricao: string;
};

export type PilarCriterios = Record<string, Criterio[]>; 

export type RespostaExistente = {
  nomeCriterio: string;
  nota: string;
  justificativa: string;
};

export type AvaliacaoColaboradorMentor = {
  idAvaliacao: string;
  nota: number;
  justificativa: string;
};

export type AvaliacaoMentor = {
  idAvaliacao: string;
  tipoAvaliacao: "COLABORADOR_MENTOR";
  status: string;
  idAvaliador: string;
  idAvaliado: string;
  avaliacaoColaboradorMentor: AvaliacaoColaboradorMentor | null;
};
