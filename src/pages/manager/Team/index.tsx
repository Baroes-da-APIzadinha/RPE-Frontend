import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import Button from "@/components/Button";
import { SearchInput } from "@/components/SearchInput";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  MdAccountCircle,
  MdOutlineHistory,
  MdOutlineModeEdit,
} from "react-icons/md";
import { ExpandableCard } from "@/components/ExpandableCard";
import { Select } from "@/components/Select";
import type { PerfilData } from "@/types/PerfilData";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { formatar } from "@/utils/formatters";
import { useLideradosComAvaliacao } from "@/hooks/avaliacoes/useLideradosComAvaliacao";
import { LoadingMessage } from "@/components/LoadingMessage";
import { EmptyMessage } from "@/components/EmptyMensage";
import { IoMdPerson } from "react-icons/io";

export function ManagerTeam() {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const idColaborador = perfil?.userId;

  const { cicloAtual } = useCicloAtual();
  const idCiclo = cicloAtual?.id;

  const { liderados, isLoading } = useLideradosComAvaliacao(
    idColaborador,
    idCiclo!
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const filteredEquipe = liderados.filter((colab) => {
    const matchesSearch = colab.nomeCompleto
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const gestorPreencheu =
      colab.notaLider !== null &&
      colab.notaLider !== undefined &&
      colab.notaLider !== 0;

    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "preenchida" && gestorPreencheu) ||
      (statusFilter === "nao-preenchida" && !gestorPreencheu);

    return matchesSearch && matchesStatus;
  });

  if (isLoading || !cicloAtual) {
    return <LoadingMessage message="Carregando dados..." />;
  }

  if (!cicloAtual) {
    return (
      <EmptyMessage
        icon={<MdAccountCircle size={32} />}
        title="Nenhum ciclo ativo"
        description="Você não está vinculado a nenhum ciclo avaliativo no momento."
      />
    );
  }

  if (!isLoading && filteredEquipe.length === 0) {
    return (
      <EmptyMessage
        icon={<MdAccountCircle size={32} />}
        title="Nenhum colaborador encontrado"
        description="Você ainda não possui liderados vinculados neste ciclo ou nenhum atende aos filtros."
      />
    );
  }

  return (
    <>
      <S.Header>
        <Title>Minha Equipe</Title>
      </S.Header>

      <Card>
        <S.Title>Filtros</S.Title>
        <S.FiltersWrapper>
          <S.FilterItem $grow>
            <label>Buscar por nome ou cargo</label>
            <SearchInput
              placeholder="Buscar membro da equipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.FilterItem>

          <S.FilterItem>
            <label>Status da avaliação</label>
            <Select
              placeholder="Todos"
              value={statusFilter}
              onChange={(val) =>
                setStatusFilter(Array.isArray(val) ? val[0] : val)
              }
              options={[
                { label: "Todos", value: "todos" },
                { label: "Preenchida", value: "preenchida" },
                { label: "Não preenchida", value: "nao-preenchida" },
              ]}
            />
          </S.FilterItem>
        </S.FiltersWrapper>
      </Card>

      <Card>
        {filteredEquipe.map((colab, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <ExpandableCard
              key={index}
              expanded={isExpanded}
              onToggle={() => toggleExpand(index)}
              header={
                <S.UserHeader>
                  <S.UserInfo>
                    <S.Avatar>
                      <IoMdPerson size={32} />
                    </S.Avatar>
                    <div>
                      <S.Name>{colab.nomeCompleto}</S.Name>
                      <S.Role>{formatar(colab.cargo as string)}</S.Role>
                    </div>
                  </S.UserInfo>
                  <S.UserActions>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Autoavaliação</S.ScoreLabel>
                      <S.ScoreValue>
                        {colab.notaAutoavaliacao ?? "-"}
                      </S.ScoreValue>
                    </S.ScoreContainer>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Nota gestor</S.ScoreLabel>
                      <S.ScoreValue>{colab.notaLider ?? "-"}</S.ScoreValue>
                    </S.ScoreContainer>
                  </S.UserActions>
                </S.UserHeader>
              }
            >
              <S.InfoWrapper>
                <S.InfoGrid>
                  <div>
                    <S.Label>Status das Avaliações</S.Label>
                    <S.StatusLine>
                      <S.StatusLabel>Autoavaliação:</S.StatusLabel>
                      <S.Badge $status={colab.statusAutoavaliacao}>
                        {colab.statusAutoavaliacao}
                      </S.Badge>
                    </S.StatusLine>
                    <S.StatusLine>
                      <S.StatusLabel>Avaliação 360°:</S.StatusLabel>
                      <S.Badge $status={colab.statusAvaliacao360}>
                        {colab.statusAvaliacao360}
                      </S.Badge>
                    </S.StatusLine>
                  </div>
                </S.InfoGrid>
                <S.FooterButtons>
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate("/gestor/collaborator/evolution", {
                        state: {
                          idColaborador: colab.idColaborador,
                          nome: colab.nomeCompleto,
                        },
                      })
                    }
                  >
                    <MdOutlineHistory /> Histórico
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/gestor/collaborator/review", {
                        state: {
                          idColaborador: colab.idColaborador,
                          idAvaliacaoLider: colab.idAvaliacaoLider,
                          nome: colab.nomeCompleto,
                          statusAvaliacaoLider: colab.statusAvaliacaoLider,
                          cardsPreenchidos: colab.cardsPreenchidos,
                        },
                      })
                    }
                  >
                    <MdOutlineModeEdit /> Editar Avaliação
                  </Button>
                </S.FooterButtons>
              </S.InfoWrapper>
            </ExpandableCard>
          );
        })}
      </Card>
    </>
  );
}
