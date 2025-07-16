import { useState, useEffect, useCallback } from 'react';
import { getLogsAuditoria } from '@/services/HTTP/auditoria';

interface LogView {
  dataHora: string;
  usuario: string;
  acao: string;
  recurso: string;
  ip: string;
}

interface UseAuditoriaReturn {
  logs: LogView[];
  loading: boolean;
  currentPage: number;
  hasNextPage: boolean;
  searchTerm: string;
  filteredLogs: LogView[];
  handlePageChange: (page: number) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useAuditoria(): UseAuditoriaReturn {
  const [logs, setLogs] = useState<LogView[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const logsPerPage = 10;

  const traduzirAcao = (action: string): string => {
    const mapa: Record<string, string> = {
      // Auth
      login_success: "Login realizado com sucesso",
      login_failed: "Tentativa de login realizada",

      // Avaliações
      preencher_auto_avaliacao: "Preencheu autoavaliação",
      preencher_avaliacao_pares: "Preencheu avaliação dos pares",
      preencher_avaliacao_colaborador_mentor: "Preencheu avaliação do mentor",
      preencher_lider_colaborador: "Preencheu avaliação do líder",
      lancar_avaliacoes: "Lançou avaliações",
      lancar_auto_avaliacoes: "Lançou autoavaliações",
      lancar_avaliacao_pares: "Lançou avaliações dos pares",
      lancar_lider_colaborador: "Lançou avaliações do líder",
      lancar_colaborador_mentor: "Lançou avaliações do mentor",

      // Ciclo
      criar_ciclo: "Criou ciclo",
      remover_ciclo: "Removeu ciclo",
      atualizar_ciclo: "Atualizou ciclo",

      // Colaborador
      delete: "Excluiu colaborador",

      // Critérios
      criar_criterio: "Criou critério",
      atualizar_criterio: "Atualizou critério",
      deletar_criterio: "Deletou critério",

      // Equalização
      "Lançamento de equalizações": "Lançou equalizações",
      atualizar_equalizacao: "Atualizou equalização",
      remover_equalizacao: "Removeu equalização",

      // Importação
      importar_avaliacoes: "Importou avaliações",
    };

    return mapa[action] ?? action;
  };

  const traduzirRecurso = (endpoint: string): string => {
    const mapa: Record<string, string> = {
      Auth: "Autenticação",
      Avaliacao: "Avaliação",
      Ciclo: "Ciclo",
      Colaborador: "Colaborador",
      Criterio: "Critério",
      Equalizacao: "Equalização",
      Importacao: "Importação",
    };

    return mapa[endpoint] ?? endpoint;
  };

  const fetchLogs = async (page: number) => {
    try {
      setLoading(true);
      const inicio = (page - 1) * logsPerPage;
      const fim = inicio + logsPerPage;
      
      const response = await getLogsAuditoria(inicio, fim);
      const logsData = response.logs;

      const viewLogs: LogView[] = logsData.map((log) => ({
        dataHora: log.dataHora,
        usuario: log.usuario,
        acao: traduzirAcao(log.acao),
        recurso: traduzirRecurso(log.endpoint),
        ip: "N/A", // IP não está disponível na nova estrutura
      }));

      setLogs(viewLogs);
      setHasNextPage(logsData.length === logsPerPage);
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && (newPage < currentPage || hasNextPage)) {
      setCurrentPage(newPage);
    }
  }, [currentPage, hasNextPage]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  // Filtrar logs localmente apenas para a busca
  const filteredLogs = logs.filter((log) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.usuario.toLowerCase().includes(term) ||
      log.acao.toLowerCase().includes(term) ||
      log.recurso.toLowerCase().includes(term)
    );
  });

  return {
    logs,
    loading,
    currentPage,
    hasNextPage,
    searchTerm,
    filteredLogs,
    handlePageChange,
    handleSearchChange,
  };
}
