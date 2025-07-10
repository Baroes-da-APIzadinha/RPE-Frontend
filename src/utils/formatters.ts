
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
}
