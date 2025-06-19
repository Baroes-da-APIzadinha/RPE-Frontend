export type Criterio = {
  nome: string;
  descricao: string;
  categoria: "comportamento" | "execucao" | "gestao";
  peso: string;
  trilhas: string[];
};
