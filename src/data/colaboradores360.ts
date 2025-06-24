export type Status = 'avaliado' | 'andamento' | 'pendente';

export interface Colaborador {
  id: number;
  name: string;
  role: string;
  unit: string;
  workTime: string;
  progress: number;
  status: Status;
}

export const mockColaboradores: Colaborador[] = [
  { id: 1, name: 'João Silva', role: 'Desenvolvedor', unit: 'Recife', workTime: '2 anos', progress: 0,  status: 'avaliado' },
  { id: 2, name: 'Maria Oliveira', role: 'Analista', unit: 'Recife', workTime: '1 ano', progress: 0,  status: 'andamento' },
  { id: 3, name: 'Carlos Santos', role: 'Gestor', unit: 'Recife', workTime: '3 anos',  progress: 0, status: 'pendente' },
];
