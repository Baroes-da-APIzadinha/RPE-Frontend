import type { TableRowBoxProps } from "@/components/TableRowBox";

export function formatar(str: string): string {
  if (!str) return "";

  const SIGLAS = ["QA", "RH", "UX"];
  const NOMES_CORRIGIDOS: Record<string, string> = {
    "sao paulo": "São Paulo",
    florianopolis: "Florianópolis",
    recife: "Recife",
    "rio de janeiro": "Rio de Janeiro",
  };

  const texto = str
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((palavra) => {
      const upper = palavra.toUpperCase();
      if (SIGLAS.includes(upper)) return upper;

      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");

  const chave = texto.toLowerCase();
  return NOMES_CORRIGIDOS[chave] || texto;
};

export const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);

    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();

    const hora = date.getHours().toString().padStart(2, "0");
    const minuto = date.getMinutes().toString().padStart(2, "0");
    const segundo = date.getSeconds().toString().padStart(2, "0");

    return {
      date: `${dia}/${mes}/${ano}`,
      time: `${hora}:${minuto}:${segundo}`,
    };
};


export const formatStatus = (status: string): TableRowBoxProps["status"] => {
  const STATUS_MAP: Record<string, TableRowBoxProps["status"]> = {
    CONCLUIDA: "Avaliado",
    EM_RASCUNHO: "Andamento",
    EM_ANDAMENTO: "Andamento",
    PENDENTE: "Pendente",
    EM_REVISAO: "Em revisão",
    EM_EQUALIZACAO: "Em equalização",
    FINALIZADA: "Finalizado",
  };

  return STATUS_MAP[status.toUpperCase()] || "Pendente";
};

