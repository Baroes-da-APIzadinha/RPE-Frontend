import { useEffect, useState } from "react";
import { getAvaliacoesPorTipoUsuario } from "@/services/HTTP/avaliacoes";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { usePerfil } from "@/hooks/usePerfil";

type AvaliacaoTipo = "AUTOAVALIACAO" | "AVALIACAO_PARES" | "COLABORADOR_MENTOR";

interface Progresso {
  autoavaliacao: number;
  avaliacaoPares: number;
  avaliacaoMentor: number;
}

export function useProgressoAvaliacao(): { progresso: Progresso; loading: boolean } {
  const { perfil } = usePerfil();
  const { cicloAtual } = useCicloAtual();
  const [progresso, setProgresso] = useState<Progresso>({
    autoavaliacao: 0,
    avaliacaoPares: 0,
    avaliacaoMentor: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!perfil || !cicloAtual) return;

      setLoading(true);

      const [auto, pares, mentor] = await Promise.all([
        getAvaliacoesPorTipoUsuario(perfil.userId, "AUTOAVALIACAO", cicloAtual.idCiclo),
        getAvaliacoesPorTipoUsuario(perfil.userId, "AVALIACAO_PARES", cicloAtual.idCiclo),
        getAvaliacoesPorTipoUsuario(perfil.userId, "COLABORADOR_MENTOR", cicloAtual.idCiclo),
      ]);

      setProgresso({
        autoavaliacao: calcularPorcentagemConcluidas(auto.avaliacoes),
        avaliacaoPares: calcularPorcentagemConcluidas(pares.avaliacoes),
        avaliacaoMentor: calcularPorcentagemConcluidas(mentor.avaliacoes),
      });

      setLoading(false);
    }

    fetchData();
  }, [perfil, cicloAtual]);

  return { progresso, loading };
}

function calcularPorcentagemConcluidas(avaliacoes: any[]) {
  if (!avaliacoes?.length) return 0;
  const concluidas = avaliacoes.filter((a) => a.status === "CONCLUIDA").length;
  return Math.round((concluidas / avaliacoes.length) * 100);
}
