// Lista de colaboradores disponíveis para indicação
export const colaboradoresDisponiveis = [
  { id: 1, nome: 'João Silva' },
  { id: 2, nome: 'Maria Oliveira' },
  { id: 3, nome: 'Carlos Santos' },
  { id: 4, nome: 'Ana Souza' },
  { id: 5, nome: 'Pedro Lima' },
];

// Identificação detalhada dos colaboradores (para exibir na lista de referências)
export const identificacaoColaborador = [
  { id: 1, nome: 'João Silva', cargo: 'Desenvolvedor Backend', tempoTrabalhado: '2 anos' },
  { id: 2, nome: 'Maria Oliveira', cargo: 'Analista de Dados', tempoTrabalhado: '1 ano e 6 meses' },
  { id: 3, nome: 'Carlos Santos', cargo: 'Gestor de Projetos', tempoTrabalhado: '3 anos' },
  { id: 4, nome: 'Ana Souza', cargo: 'UX Designer', tempoTrabalhado: '8 meses' },
  { id: 5, nome: 'Pedro Lima', cargo: 'DevOps', tempoTrabalhado: '1 ano' },
];

// Template vazio para envio de referência
export const referenciaTemplate = {
  idIndicado: '', // id do colaborador indicado
  idIndicador: '', // id do colaborador que está indicando
  idCiclo: '', // id do ciclo de avaliação
  tipo: '', // 'tecnica' ou 'cultural'
  justificativa: '',
};
