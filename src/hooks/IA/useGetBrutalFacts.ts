import { useState, useEffect } from "react";
import { getBrutalFacts } from "@/services/HTTP/IA";

export interface BrutalFactsData {
  pontosFortes: string[];
  oportunidadesMelhoria: string[];
  notaFinalEqualizada: string;
  justificativaComite: string;
  recomendacoesComite: string[];
  mensagemColaborador: string;
  textoCompleto: string;
}

export interface UseGetBrutalFactsReturn {
  data: BrutalFactsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGetBrutalFacts(idColaborador: string, idCiclo: string): UseGetBrutalFactsReturn {
  const [data, setData] = useState<BrutalFactsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para processar texto da API
  const processApiResponse = (textoCompleto: string): BrutalFactsData => {
    // Extrai pontos fortes
    const pontosFortes: string[] = [];
    const pontosMatch = textoCompleto.match(/- Pontos Fortes:\s*(.*?)(?=- Oportunidades de Melhoria:)/s);
    if (pontosMatch) {
      const pontosText = pontosMatch[1];
      const pontos = pontosText.match(/    - (.*?)(?=\n|$)/g);
      if (pontos) {
        pontos.forEach(ponto => {
          pontosFortes.push(ponto.replace(/^\s*-\s*/, '').trim());
        });
      }
    }

    // Extrai oportunidades de melhoria
    const oportunidadesMelhoria: string[] = [];
    const oportunidadesMatch = textoCompleto.match(/- Oportunidades de Melhoria:\s*(.*?)(?=- Nota Final Equalizada:)/s);
    if (oportunidadesMatch) {
      const oportunidadesText = oportunidadesMatch[1];
      const oportunidades = oportunidadesText.match(/    - (.*?)(?=\n|$)/g);
      if (oportunidades) {
        oportunidades.forEach(oportunidade => {
          oportunidadesMelhoria.push(oportunidade.replace(/^\s*-\s*/, '').trim());
        });
      }
    }

    // Extrai nota final equalizada
    const notaMatch = textoCompleto.match(/- Nota Final Equalizada:\s*(.*?)(?=- Justificativa do Comitê:)/s);
    const notaFinalEqualizada = notaMatch ? notaMatch[1].trim() : '';

    // Extrai justificativa do comitê
    const justificativaMatch = textoCompleto.match(/- Justificativa do Comitê:\s*(.*?)(?=- Recomendações do Comitê:)/s);
    const justificativaComite = justificativaMatch ? justificativaMatch[1].trim() : '';

    // Extrai recomendações do comitê
    const recomendacoesComite: string[] = [];
    const recomendacoesMatch = textoCompleto.match(/- Recomendações do Comitê:\s*(.*?)(?=- Mensagem para o Colaborador:)/s);
    if (recomendacoesMatch) {
      const recomendacoesText = recomendacoesMatch[1];
      const recomendacoes = recomendacoesText.match(/    - (.*?)(?=\n|$)/g);
      if (recomendacoes) {
        recomendacoes.forEach(recomendacao => {
          recomendacoesComite.push(recomendacao.replace(/^\s*-\s*/, '').trim());
        });
      }
    }

    // Extrai mensagem para o colaborador
    const mensagemMatch = textoCompleto.match(/- Mensagem para o Colaborador:\s*(.*?)(?=\n|$)/s);
    const mensagemColaborador = mensagemMatch ? mensagemMatch[1].trim() : '';

    const result = {
      pontosFortes,
      oportunidadesMelhoria,
      notaFinalEqualizada,
      justificativaComite,
      recomendacoesComite,
      mensagemColaborador,
      textoCompleto
    };

    console.log("Parsed brutal facts:", result);
    
    return result;
  };

  const fetchData = async () => {
    if (!idColaborador || !idCiclo) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await getBrutalFacts(idColaborador, idCiclo);
      console.log("Brutal facts response:", response);
      const textoCompleto = response.toString() || '';
      
      const processedData = processApiResponse(textoCompleto);
      
      setData(processedData);
    } catch (err) {
      console.error('Erro ao buscar brutal facts:', err);
      setError('Erro ao carregar brutal facts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idColaborador, idCiclo]);

  const refetch = async () => {
    if (!idColaborador || !idCiclo) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await getBrutalFacts(idColaborador, idCiclo);
      const textoCompleto = response || '';
      
      const processedData = processApiResponse(textoCompleto);
      
      setData(processedData);
    } catch (err) {
      console.error('Erro ao buscar brutal facts:', err);
      setError('Erro ao carregar brutal facts');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}
