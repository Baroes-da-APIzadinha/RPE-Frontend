import * as S from "./styles";
import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { SearchInput } from "@/components/SearchInput";
import { Modal } from "@/components/Modal";
import { MdOutlineCheckCircleOutline, MdWarning } from "react-icons/md";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import { IoSparklesOutline } from "react-icons/io5";
import { ExpandableCard } from "@/components/ExpandableCard";
import { useNotasCiclo } from "@/hooks/comite/useNotasCiclo";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { IoMdPerson } from "react-icons/io";
import { StarRating } from "@/components/StarRating";
import { useMiniAvaliacaoIA, clearMiniAvaliacaoIACache } from "@/hooks/IA/useMiniAvaliacaoIA";
import { formatar } from "@/utils/formatters";
import { toast } from "sonner";

// Componente memoizado para exibir resumo da IA
const CollaboratorAISummary = memo(({ idColaborador, idCiclo }: { idColaborador: string; idCiclo: string }) => {
  const { data, loading, error } = useMiniAvaliacaoIA(idColaborador, idCiclo);

  if (loading) {
    return (
      <S.SummaryContent>
        <strong>Resumo</strong>
        <span>Aguarde o resumo gerado pela IA...</span>
      </S.SummaryContent>
    );
  }

  if (error || !data) {
    return (
      <S.SummaryContent>
        <strong>Resumo</strong>
        <span>Erro ao carregar resumo da IA</span>
      </S.SummaryContent>
    );
  }

  return (
    <S.SummaryContent>
      <strong>Nota Final Sugerida: {data.notaFinalSugerida}/5</strong>
      <span>{data.justificativa}</span>
    </S.SummaryContent>
  );
});

CollaboratorAISummary.displayName = 'CollaboratorAISummary';


export function CollaboratorEqualization() {
  const navigate = useNavigate();
  const [notas, setNotas] = useState<Record<number, number>>({});
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [justifications, setJustifications] = useState<Record<number, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [colaboradorToApprove, setColaboradorToApprove] = useState<{
    id: string;
    nome: string;
    index: number;
  } | null>(null);

  // Obtém ciclo atual
  const { cicloAtual } = useCicloAtual();
  const idCiclo = cicloAtual?.id ?? "";

  // Hook de notas do ciclo
  const { data: colaboradores, loading, error } = useNotasCiclo(idCiclo);

  // Limpa o cache ao sair da página
  useEffect(() => {
    return () => {
      clearMiniAvaliacaoIACache();
    };
  }, []);

  // Memoização das funções para evitar re-renders
  const handleReview = useCallback((colaboradorId: string) => {
    navigate(`/comite/collaborator-discrepancy/${encodeURIComponent(colaboradorId)}`);
  }, [navigate]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleToggleExpanded = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleNotaChange = useCallback((index: number, star: number) => {
    setNotas((prev) => ({ ...prev, [index]: star }));
  }, []);

  const handleJustificationChange = useCallback((index: number, value: string) => {
    setJustifications((prev) => ({ ...prev, [index]: value }));
  }, []);

  const handleApproveClick = useCallback((colaboradorId: string, colaboradorNome: string, index: number) => {
    // Verificar se a nota e a justificativa foram definidas
    if (!notas[index] || notas[index] === 0) {
      toast.error("defina uma nota antes de aprovar a avaliação.");
      return;
    }

    if (!justifications[index] || justifications[index].trim() === "") {
      toast.error("preencha a justificativa antes de aprovar a avaliação.");
      return;
    }

    setColaboradorToApprove({ id: colaboradorId, nome: colaboradorNome, index });
    setConfirmModalOpen(true);
  }, [notas, justifications]);

  const handleConfirmApproval = useCallback(() => {
    if (colaboradorToApprove) {
      // Aqui seria implementada a lógica de aprovação
      console.log(`Aprovando colaborador: ${colaboradorToApprove.nome}`);
      console.log(`Nota: ${notas[colaboradorToApprove.index] || 0}`);
      console.log(`Justificativa: ${justifications[colaboradorToApprove.index] || ""}`);
      
      // Fechar modal e limpar estado
      setConfirmModalOpen(false);
      setColaboradorToApprove(null);
    }
  }, [colaboradorToApprove, notas, justifications]);

  const handleCancelApproval = useCallback(() => {
    setConfirmModalOpen(false);
    setColaboradorToApprove(null);
  }, []);

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
              onChange={handleSearchChange}
            />
          </S.FilterItem>
        </S.FiltersWrapper>
      </Card>

      <Card>
        {sortedCollaborators.map((colab, index) => (
          <ExpandableCard
            key={colab.idColaborador}
            expanded={expandedIndex === index}
            onToggle={() => handleToggleExpanded(index)}
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
                    <S.Role>{formatar(colab.cargoColaborador)}</S.Role>
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
                    {colab.notas.discrepancia.toFixed(2) ?? "-"}
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
                  <CollaboratorAISummary idColaborador={colab.idColaborador} idCiclo={idCiclo} />
                </S.SummaryBox>
              </div>
            </S.InfoGrid>

            <S.Label>Avaliação Final do Comitê</S.Label>
            <S.InfoGrid>
              <S.RatingRow>
                <S.Label>Nota:</S.Label>
                <StarRating
                  value={notas[index] ?? 0}
                  onChange={(star) => handleNotaChange(index, star)}
                  readOnly={false}
                />
                <S.Score>{notas[index] ?? 0}</S.Score>
              </S.RatingRow>
              <Textarea
                placeholder="Descreva os motivos para a decisão do comitê…"
                value={justifications[index] ?? ""}
                onChange={(e) => handleJustificationChange(index, e.target.value)}
              />
            </S.InfoGrid>

            <S.FooterButtons>
              <Button
                variant="outline"
                onClick={() => handleReview(colab.idColaborador)}
              >
                Revisar
              </Button>
              <Button 
                variant="primary"
                onClick={() => handleApproveClick(colab.idColaborador, colab.nomeColaborador, index)}
              >
                <MdOutlineCheckCircleOutline />
                Aprovar
              </Button>
            </S.FooterButtons>
          </ExpandableCard>
        ))}
      </Card>

      <Modal
        open={confirmModalOpen}
        onClose={handleCancelApproval}
        title="Confirmar Aprovação"
        description="Esta ação é irreversível e não poderá ser desfeita."
        icon={<MdWarning />}
        iconColor="warning"
        iconSize="large"
      >
        <S.ModalContent>
          <S.ModalDescription>
            Tem certeza que deseja aprovar a avaliação de <strong>{colaboradorToApprove?.nome}</strong>?
          </S.ModalDescription>
          {colaboradorToApprove && (
            <S.ModalSummary>
              <S.ModalSummaryTitle>
                Nota Final: {notas[colaboradorToApprove.index] || 0}/5
              </S.ModalSummaryTitle>
              {justifications[colaboradorToApprove.index] && (
                <S.ModalSummaryText>
                  Justificativa: {justifications[colaboradorToApprove.index]}
                </S.ModalSummaryText>
              )}
            </S.ModalSummary>
          )}
        </S.ModalContent>
        
        <S.ModalActions>
          <Button 
            variant="outline" 
            onClick={handleCancelApproval}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirmApproval}
          >
            Confirmar Aprovação
          </Button>
        </S.ModalActions>
      </Modal>
    </>
  );
}
