import React from "react";
import * as S from "./styles";
import { Card } from "@/components/Card";
import { MdArrowBackIosNew, MdArrowForwardIos, MdInfo } from "react-icons/md";
import { Title } from "@/components/Title";
import { formatDateTime } from "@/utils/formatters";
import Button from "@/components/Button";
import { useAuditoria } from "@/hooks/useAuditoria";
import { LoadingMessage } from "@/components/LoadingMessage";
import { EmptyMessage } from "@/components/EmptyMensage";

const AuditoriaPage: React.FC = () => {
  const {
    loading,
    currentPage,
    hasNextPage,
    filteredLogs,
    handlePageChange,
  } = useAuditoria();

  if (loading) return <LoadingMessage message="Carregando registros de auditoria..." />;

  if (!filteredLogs.length) {
  return (
    <EmptyMessage
      icon={<MdInfo size={32} />}
      title="Nenhuma ação registrada"
      description="Nenhuma atividade sensível foi registrada até o momento. Os logs de auditoria aparecerão aqui conforme o uso da plataforma."
    />
  );
}


  return (
    <>
      <S.Header>
        <Title>Log de Auditoria e Ações Sensíveis</Title>
      </S.Header>


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
            Página {currentPage}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
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
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => {
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
            Página {currentPage}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
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
