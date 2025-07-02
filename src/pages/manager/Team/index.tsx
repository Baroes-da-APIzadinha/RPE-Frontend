import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import Button from "@/components/Button";
import { SearchInput } from "@/components/SearchInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineHistory, MdOutlineModeEdit } from "react-icons/md";
import { ExpandableCard } from "@/components/ExpandableCard";
import { equipeMock } from "@/data/manegerTeamMock";


export function ManagerTeam() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <S.Header>
        <Title>Minha Equipe</Title>
        <SearchInput placeholder="Buscar membro da equipe..." />
      </S.Header>

      <Card>
        {equipeMock.map((colab, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <ExpandableCard
              key={index}
              expanded={isExpanded}
              onToggle={() => toggleExpand(index)}
              header={
                <S.UserHeader>
                  <S.UserInfo>
                    <S.Avatar />
                    <div>
                      <S.Name>{colab.nome}</S.Name>
                      <S.Role>{colab.cargo}</S.Role>
                      <S.Since>
                        Trabalha com você há {colab.tempoEquipe}
                      </S.Since>
                    </div>
                  </S.UserInfo>
                  <S.UserActions>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Autoavaliação</S.ScoreLabel>
                      <S.ScoreValue>{colab.autoavaliacao ?? "-"}</S.ScoreValue>
                    </S.ScoreContainer>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Nota gestor</S.ScoreLabel>
                      <S.ScoreValue>{colab.notaGestor ?? "-"}</S.ScoreValue>
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
                      <S.Badge $status={colab.statusAvaliacoes.autoavaliacao}>
                        {colab.statusAvaliacoes.autoavaliacao}
                      </S.Badge>
                    </S.StatusLine>
                    <S.StatusLine>
                      <S.StatusLabel>Avaliação 360°:</S.StatusLabel>
                      <S.Badge $status={colab.statusAvaliacoes.avaliacao360}>
                        {colab.statusAvaliacoes.avaliacao360}
                      </S.Badge>
                    </S.StatusLine>
                  </div>
                  <div>
                    <S.Label>Pontos Fortes</S.Label>
                    <S.TagList>
                      {colab.pontosFortes.map((ponto, i) => (
                        <S.Tag key={i}>{ponto}</S.Tag>
                      ))}
                    </S.TagList>
                  </div>
                  <div>
                    <S.Label>Pontos de atenção</S.Label>
                    <S.TagList>
                      {colab.pontosAtencao.map((ponto, i) => (
                        <S.Tag key={i}>{ponto}</S.Tag>
                      ))}
                    </S.TagList>
                  </div>
                </S.InfoGrid>
                <S.FooterButtons>
                  <Button
                    variant="outline"
                    onClick={() => console.log("Editar Avaliação")}
                  >
                    <MdOutlineHistory /> Histórico
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/gestor/collaborator/review")}
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
