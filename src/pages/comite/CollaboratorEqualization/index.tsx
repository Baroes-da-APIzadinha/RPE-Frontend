import * as S from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { SearchInput } from "@/components/SearchInput";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import { IoSparklesOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { ExpandableCard } from "@/components/ExpandableCard";
import { useNotasCiclo } from "@/hooks/comite/useNotasCiclo";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { IoMdPerson } from "react-icons/io";


export function CollaboratorEqualization() {
  const navigate = useNavigate();
  const [notas, setNotas] = useState<Record<number, number>>({});
  const [hover, setHover] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [justifications, setJustifications] = useState<Record<number, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Obtém ciclo atual
  const { cicloAtual } = useCicloAtual();
  const idCiclo = cicloAtual?.id ?? "";

  // Hook de notas do ciclo
  const { data: colaboradores, loading, error } = useNotasCiclo(idCiclo);

  const filteredCollaborators = colaboradores.filter((colab) => {
    const matchesSearch = `${colab.nomeColaborador} ${colab.cargoColaborador}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const sortedCollaborators = [...filteredCollaborators].sort((a, b) => {
    const discrepancyA = a.notas.discrepancia ?? -Infinity;
    const discrepancyB = b.notas.discrepancia ?? -Infinity;
    return discrepancyB - discrepancyA;
  });

  const handleReview = (colaboradorId: string) => {
    navigate(`/comite/collaborator-discrepancy/${encodeURIComponent(colaboradorId)}`);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <S.Header>
        <Title>Equalização de Avaliações</Title>
      </S.Header>

      <Card>
        <S.Title>Filtros</S.Title>
        <S.FiltersWrapper>
          <S.FilterItem>
            <label>Buscar por nome ou cargo</label>
            <SearchInput
              placeholder="Buscar colaborador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.FilterItem>
        </S.FiltersWrapper>
      </Card>

      <Card>
        {sortedCollaborators.map((colab, index) => (
          <ExpandableCard
            key={colab.idColaborador}
            expanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex((prev) => (prev === index ? null : index))
            }
            header={
              <S.UserHeader>
                <S.UserInfo>
                  <S.Avatar>
                    <IoMdPerson size={32} />
                  </S.Avatar>
                  <div>
                    <S.Name>
                      {colab.nomeColaborador}
                    </S.Name>
                    <S.Role>{colab.cargoColaborador}</S.Role>
                  </div>
                </S.UserInfo>
                <S.ScoreContainer>
                  <S.ScoreLabel>Autoavaliação</S.ScoreLabel>
                  <S.ScoreValue>{colab.notas.notaAuto ?? "-"}</S.ScoreValue>
                </S.ScoreContainer>
                <S.ScoreContainer>
                  <S.ScoreLabel>Avaliação 360</S.ScoreLabel>
                  <S.ScoreValue>{colab.notas.nota360media ?? "-"}</S.ScoreValue>
                </S.ScoreContainer>
                <S.ScoreContainer>
                  <S.ScoreLabel>Nota gestor</S.ScoreLabel>
                  <S.ScoreValue>{colab.notas.notaGestor ?? "-"}</S.ScoreValue>
                </S.ScoreContainer>
                <S.ScoreContainer>
                  <S.ScoreLabel>Discrepância</S.ScoreLabel>
                  <S.DiscrepancyValue $value={colab.notas.discrepancia}>
                    {colab.notas.discrepancia ?? "-"}
                  </S.DiscrepancyValue>
                </S.ScoreContainer>
              </S.UserHeader>
            }
          >
            <S.InfoGrid>
              <div>
                <S.Label>Resumo IA</S.Label>
                <S.SummaryBox>
                  <S.IconSpan>
                    <IoSparklesOutline size={24} />
                  </S.IconSpan>
                  <S.SummaryContent>
                    <strong>Resumo</strong>
                    <span>Aguarde o resumo gerado pela IA...</span>
                  </S.SummaryContent>
                </S.SummaryBox>
              </div>
            </S.InfoGrid>

            <S.Label>Avaliação Final do Comitê</S.Label>
            <S.InfoGrid>
              <S.RatingRow>
                <S.Label>Nota:</S.Label>
                {[1.0, 2.0, 3.0, 4.0, 5.0].map((star) => (
                  <S.StarButton
                    key={star}
                    onClick={() => setNotas({ ...notas, [index]: star })}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    $active={star <= (hover ?? notas[index] ?? 0)}
                  >
                    <FaStar />
                  </S.StarButton>
                ))}
                <S.Score>{notas[index] ?? 0}</S.Score>
              </S.RatingRow>
              <Textarea
                placeholder="Descreva os motivos para a decisão do comitê…"
                value={justifications[index] ?? ""}
                onChange={(e) =>
                  setJustifications({
                    ...justifications,
                    [index]: e.target.value,
                  })
                }
              />
            </S.InfoGrid>

            <S.FooterButtons>
              <Button
                variant="outline"
                onClick={() => handleReview(colab.idColaborador)}
              >
                Revisar
              </Button>
              <Button variant="primary">
                <MdOutlineCheckCircleOutline />
                Aprovar
              </Button>
            </S.FooterButtons>
          </ExpandableCard>
        ))}
      </Card>
    </>
  );
}
