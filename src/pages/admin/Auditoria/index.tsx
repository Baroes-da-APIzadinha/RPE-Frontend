import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { Card } from "@/components/Card";
import { MdArrowBackIosNew, MdArrowForwardIos, MdInfo } from "react-icons/md";
import { Title } from "@/components/Title";
import { SearchInput } from "@/components/SearchInput";
import { formatDateTime } from "@/utils/formatters";
import Button from "@/components/Button";
import { getLogsAuditoria, type LogAuditoria } from "@/services/HTTP/auditoria";
import { getColaboradorById } from "@/services/HTTP/colaboradores";
import type { Colaborador } from "@/types/Colaborador";

interface LogView {
  dataHora: string;
  usuario: string;
  acao: string;
  recurso: string;
  ip: string;
}

const AuditoriaPage: React.FC = () => {
  const [logs, setLogs] = useState<LogView[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const logsPerPage = 10;

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        const logsData: LogAuditoria[] = await getLogsAuditoria();

        // Buscar nomes dos usuários
        const userIds = [...new Set(logsData.map((log) => log.userId))];
        const colaboradoresMap: Record<string, string> = {};

        await Promise.all(
          userIds.map(async (id) => {
            try {
              const colaborador = (await getColaboradorById(id)) as Colaborador;
              console.log("informacoes do colaborador", colaborador);
              colaboradoresMap[id] = colaborador.nomeCompleto;
            } catch (e) {
              colaboradoresMap[id] = "Usuário desconhecido";
            }
          })
        );

        const viewLogs: LogView[] = logsData.map((log) => ({
          dataHora: log.timestamp,
          usuario: colaboradoresMap[log.userId] || "Usuário desconhecido",
          acao: traduzirAcao(log.action),
          recurso: traduzirRecurso(log.resource, log.details),
          ip: log.ip,
        }));

        setLogs(viewLogs);
      } catch (error) {
        console.error("Erro ao buscar logs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

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

  const traduzirRecurso = (resource: string, details: any): string => {
    switch (resource) {
      case "Avaliacao":
        return details?.idAvaliacao
          ? `Avaliação #${details.idAvaliacao.slice(0, 8)}`
          : "Avaliação";

      case "Auth":
        return details?.email ? `Login (${details.email})` : "Autenticação";

      case "Ciclo":
        return details?.id ? `Ciclo #${details.id.slice(0, 8)}` : "Ciclo";

      case "Colaborador":
        return details?.id
          ? `Colaborador #${details.id.slice(0, 8)}`
          : "Colaborador";

      case "Criterio":
        return details?.nome ? `Critério (${details.nome})` : "Critério";

      case "Equalizacao":
        return "Equalização";

      case "Importacao":
        return "Importação de Avaliações";

      default:
        return resource;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      log.usuario.toLowerCase().includes(term) ||
      log.acao.toLowerCase().includes(term) ||
      log.recurso.toLowerCase().includes(term) ||
      log.ip.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <S.Header>
        <Title>Log de Auditoria e Ações Sensíveis</Title>
      </S.Header>

      <Card>
        <S.TitleCard>Buscar nos registros</S.TitleCard>
        <S.FiltersWrapper>
          <S.FilterItem>
            <label htmlFor="log-search">
              Filtrar por usuário, ação, recurso ou IP
            </label>
            <SearchInput
              id="log-search"
              placeholder="Digite nome, ação, IP ou recurso…"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </S.FilterItem>
        </S.FiltersWrapper>
      </Card>

      <Card>
        <S.Pagination>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdArrowBackIosNew size={24} />
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
            <MdArrowForwardIos size={24} />
          </Button>
        </S.Pagination>
        <S.TableContainer>
          <S.Table>
            <thead>
              <tr>
                <S.Th>Data/Hora</S.Th>
                <S.Th>Usuário</S.Th>
                <S.Th>Ação</S.Th>
                <S.Th>Recurso</S.Th>
                <S.Th>IP de Origem</S.Th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((log, index) => {
                const datetime = formatDateTime(log.dataHora);
                return (
                  <S.Tr key={index} $highlight={index % 2 === 0}>
                    <S.Td data-label="Data/Hora">
                      <S.TimestampCell>
                        <span>{datetime.date}</span>
                        <span>{datetime.time}</span>
                      </S.TimestampCell>
                    </S.Td>
                    <S.Td data-label="Usuário">{log.usuario}</S.Td>
                    <S.Td data-label="Ação">
                      <S.ActionCell>
                        <MdInfo size={16} />
                        {log.acao}
                      </S.ActionCell>
                    </S.Td>
                    <S.Td data-label="Recurso">{log.recurso}</S.Td>
                    <S.Td data-label="IP de Origem">{log.ip}</S.Td>
                  </S.Tr>
                );
              })}
            </tbody>
          </S.Table>
        </S.TableContainer>
        <S.Pagination>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdArrowBackIosNew size={24} />
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
            <MdArrowForwardIos size={24} />
          </Button>
        </S.Pagination>
      </Card>
    </>
  );
};

export default AuditoriaPage;
