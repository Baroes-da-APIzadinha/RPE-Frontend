import React, { useCallback, useState } from "react";
import * as S from "./styles";
import { Card } from "@/components/Card";
import { MdArrowBackIosNew, MdArrowForwardIos, MdInfo } from "react-icons/md";
import { Title } from "@/components/Title";
import { SearchInput } from "@/components/SearchInput";
import { formatDateTime } from "@/utils/formatters";
import Button from "@/components/Button";

interface LogEntry {
  dataHora: string;
  usuario: string;
  acao: string;
  recurso: string;
  ip: string;
}

const mockLogs: LogEntry[] = [
  {
    dataHora: "2025-07-11 14:32:10",
    usuario: "João Silva",
    acao: "Atualizou permissões",
    recurso: "Usuário #1023",
    ip: "192.168.0.1",
  },
  {
    dataHora: "2025-07-11 13:54:22",
    usuario: "Ana Costa",
    acao: "Exportou dados sensíveis",
    recurso: "Relatório RH",
    ip: "192.168.0.15",
  },
  {
    dataHora: "2025-07-11 11:30:45",
    usuario: "Carlos Mendes",
    acao: "Criou novo ciclo",
    recurso: "Ciclo 2025.1",
    ip: "192.168.0.22",
  },
  {
    dataHora: "2025-07-11 10:15:33",
    usuario: "Maria Santos",
    acao: "Excluiu avaliação",
    recurso: "Avaliação #458",
    ip: "192.168.0.8",
  },
  {
    dataHora: "2025-07-11 09:45:17",
    usuario: "Pedro Costa",
    acao: "Modificou critérios",
    recurso: "Ciclo 2024.2",
    ip: "192.168.0.30",
  },
  {
    dataHora: "2025-07-10 17:01:12",
    usuario: "Bruna Lima",
    acao: "Criou novo usuário",
    recurso: "Usuário #1045",
    ip: "192.168.0.2",
  },
  {
    dataHora: "2025-07-10 16:23:47",
    usuario: "Tiago Rocha",
    acao: "Resetou senha",
    recurso: "Usuário #1029",
    ip: "192.168.0.10",
  },
  {
    dataHora: "2025-07-10 15:05:33",
    usuario: "Gabriela Nunes",
    acao: "Atualizou ciclo",
    recurso: "Ciclo 2025.1",
    ip: "192.168.0.33",
  },
  {
    dataHora: "2025-07-10 14:45:00",
    usuario: "Vinícius Reis",
    acao: "Gerou relatório",
    recurso: "Desempenho Geral",
    ip: "192.168.0.9",
  },
  {
    dataHora: "2025-07-10 14:01:11",
    usuario: "Lucas Almeida",
    acao: "Alterou permissões",
    recurso: "Usuário #1007",
    ip: "192.168.0.6",
  },
  {
    dataHora: "2025-07-10 13:35:25",
    usuario: "Fernanda Dias",
    acao: "Excluiu ciclo",
    recurso: "Ciclo 2023.2",
    ip: "192.168.0.11",
  },
  {
    dataHora: "2025-07-10 13:10:09",
    usuario: "Henrique Lopes",
    acao: "Visualizou dados sensíveis",
    recurso: "Relatório Confidencial",
    ip: "192.168.0.21",
  },
  {
    dataHora: "2025-07-10 12:22:48",
    usuario: "Patrícia Ribeiro",
    acao: "Exportou ciclo",
    recurso: "Ciclo 2022.2",
    ip: "192.168.0.12",
  },
  {
    dataHora: "2025-07-10 11:45:17",
    usuario: "Rafael Cunha",
    acao: "Fez backup",
    recurso: "Base de Dados",
    ip: "192.168.0.14",
  },
  {
    dataHora: "2025-07-10 10:55:33",
    usuario: "Juliana Campos",
    acao: "Criou avaliação",
    recurso: "Avaliação #501",
    ip: "192.168.0.18",
  },
  {
    dataHora: "2025-07-10 10:05:27",
    usuario: "Eduardo Meireles",
    acao: "Atualizou critérios",
    recurso: "Ciclo 2025.2",
    ip: "192.168.0.19",
  },
  {
    dataHora: "2025-07-10 09:45:33",
    usuario: "Isabela Castro",
    acao: "Criou grupo de usuários",
    recurso: "Grupo Admin",
    ip: "192.168.0.23",
  },
  {
    dataHora: "2025-07-10 09:12:59",
    usuario: "Rodrigo Peixoto",
    acao: "Desativou usuário",
    recurso: "Usuário #1050",
    ip: "192.168.0.25",
  },
];

const AuditoriaPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = mockLogs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      log.usuario.toLowerCase().includes(term) ||
      log.acao.toLowerCase().includes(term) ||
      log.recurso.toLowerCase().includes(term) ||
      log.ip.toLowerCase().includes(term)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  // Cálculo da paginação
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

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

  return (
    <>
      <S.Header>
        <Title>Log de Auditoria e Ações Sensíveis</Title>
      </S.Header>

      <Card>
        <S.Title>Filtros</S.Title>
        <S.FiltersWrapper>
          <S.FilterItem>
            <label>Buscar por nome ou cargo</label>
            <SearchInput
              placeholder="Buscar colaborador..."
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
                    <S.Td>
                      <S.TimestampCell>
                        <span>{datetime.date}</span>
                        <span>{datetime.time}</span>
                      </S.TimestampCell>
                    </S.Td>
                    <S.Td>{log.usuario}</S.Td>
                    <S.Td>
                      <S.ActionCell>
                        <MdInfo size={16} />
                        {log.acao}
                      </S.ActionCell>
                    </S.Td>
                    <S.Td>{log.recurso}</S.Td>
                    <S.Td>{log.ip}</S.Td>
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
