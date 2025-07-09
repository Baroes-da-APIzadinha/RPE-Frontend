export interface PilarNota {
  pilarNome: string;
  pilarNota: number;
}

export interface CicloPilarNotas {
  ciclo: string;
  notas: PilarNota[];
}