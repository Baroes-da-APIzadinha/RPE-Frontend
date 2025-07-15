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
import { useEqualizacaoColaborador } from "@/hooks/comite/useEqualizacaoColaborador";
import { useSendEqualizacao } from "@/hooks/comite/useSendEqualizacao";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { IoMdPerson } from "react-icons/io";
import { StarRating } from "@/components/StarRating";
import { useMiniAvaliacaoIA, clearMiniAvaliacaoIACache } from "@/hooks/IA/useMiniAvaliacaoIA";
import { useGerarBrutalFacts } from "@/hooks/IA/useGerarBrutalFacts";
import { formatar } from "@/utils/formatters";
import { toast } from "sonner";
import type { SendEqualizacaoParams } from "@/types/equalizacao";
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

// Componente memoizado para gerenciar equalização de cada colaborador
const CollaboratorEqualizationItem = memo(({ 
  colab, 
  index, 
  idCiclo, 
  expandedIndex, 
  onToggleExpanded,
  onReview,
  onApproveClick
}: {
  colab: any;
  index: number;
  idCiclo: string;
  expandedIndex: number | null;
  onToggleExpanded: (index: number) => void;
  onReview: (colaboradorId: string) => void;
  onApproveClick: (colaboradorId: string, colaboradorNome: string, index: number, nota: number, justificativa: string, status: string, equalizacaoId: string | null) => void;
}) => {
  const [equalizacaoId, setEqualizacaoId] = useState<string | null>(null);
  const [nota, setNota] = useState<number>(0);
  const [justificativa, setJustificativa] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  const { data: equalizacaoData } = useEqualizacaoColaborador(colab.idColaborador, idCiclo);

  useEffect(() => {
    if (equalizacaoData && equalizacaoData.length > 0) {
      const equalizacao = equalizacaoData[0];
      setEqualizacaoId(equalizacao.idEqualizacao);
      setNota(equalizacao.notaAjustada);
      setJustificativa(equalizacao.justificativa);
      setIsCompleted(equalizacao.status === "CONCLUIDA");
    }
  }, [equalizacaoData]);

  const handleNotaChange = useCallback((star: number) => {
    if (!isCompleted) {
      setNota(star);
    }
  }, [isCompleted]);

  const handleJustificativaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isCompleted) {
      setJustificativa(e.target.value);
    }
  }, [isCompleted]);

  const handleApprove = useCallback(() => {
    if (!nota || nota === 0) {
      toast.error("defina uma nota antes de aprovar a avaliação.");
      return;
    }

    if (!justificativa || justificativa.trim() === "") {
      toast.error("preencha a justificativa antes de aprovar a avaliação.");
      return;
    }

    onApproveClick(colab.idColaborador, colab.nomeColaborador, index, nota, justificativa, "CONCLUIDA", equalizacaoId);
  }, [nota, justificativa, colab.idColaborador, colab.nomeColaborador, index, onApproveClick]);

  return (
    <ExpandableCard
      key={colab.idColaborador}
      expanded={expandedIndex === index}
      onToggle={() => onToggleExpanded(index)}
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
            value={nota}
            onChange={handleNotaChange}
            readOnly={isCompleted}
          />
          <S.Score>{nota}</S.Score>
        </S.RatingRow>
        <Textarea
          placeholder="Descreva os motivos para a decisão do comitê…"
          value={justificativa}
          onChange={handleJustificativaChange}
          disabled={isCompleted}
        />
      </S.InfoGrid>

      <S.FooterButtons>
        <Button
          variant="outline"
          onClick={() => onReview(colab.idColaborador)}
        >
          Revisar
        </Button>
        <Button 
          variant="primary"
          onClick={handleApprove}
          disabled={isCompleted}
        >
          <MdOutlineCheckCircleOutline />
          {isCompleted ? "Concluído" : "Aprovar"}
        </Button>
      </S.FooterButtons>
    </ExpandableCard>
  );
});

CollaboratorEqualizationItem.displayName = 'CollaboratorEqualizationItem';


export function CollaboratorEqualization() {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [colaboradorToApprove, setColaboradorToApprove] = useState<{
    id: string;
    nome: string;
    index: number;
    nota: number;
    justificativa: string;
    status: string;
    equalizacaoId: string | null;
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

  const handleApproveClick = useCallback((colaboradorId: string, colaboradorNome: string, index: number, nota : number, justificativa : string, status : string, equalizacaoId: string | null) => {
    setColaboradorToApprove({ id: colaboradorId, nome: colaboradorNome, index, nota, justificativa, status, equalizacaoId });
    setConfirmModalOpen(true);
  }, []);

  const { sendEqualizacaoData } = useSendEqualizacao();
  const { generateBrutalFacts } = useGerarBrutalFacts();
  
  const handleConfirmApproval = useCallback(async () => {
    if (colaboradorToApprove) {
      if (!colaboradorToApprove.equalizacaoId) {
        toast.error("ID de equalização não encontrado.");
        return;
      }

      const colab : SendEqualizacaoParams = {
        idEqualizacao: colaboradorToApprove.equalizacaoId,
        notaAjustada: colaboradorToApprove.nota,
        justificativa: colaboradorToApprove.justificativa,
        status: colaboradorToApprove.status
      };
      try {
      await sendEqualizacaoData(colab)
      toast.success(`${colaboradorToApprove.nome} teve a nota equalizada com sucesso!`);

      

      } catch (error) {
        console.error("Erro ao enviar equalização:", error);
        toast.error("Erro ao enviar equalização.");
        return;
      }
      
      // Fechar modal e limpar estado
      setConfirmModalOpen(false);
      setColaboradorToApprove(null);

      // Gerar brutal facts após sucesso da equalização
      try {
        await generateBrutalFacts(colaboradorToApprove.id, idCiclo);
        console.log("Brutal facts gerados com sucesso para:", colaboradorToApprove.nome);
      } catch (brutalFactsError) {
        console.error("Erro ao gerar brutal facts:", brutalFactsError);
        // Não exibir erro para o usuário, apenas logar
      }
      window.location.reload(); // Recarrega a página para atualizar os dados
    }
  }, [colaboradorToApprove, sendEqualizacaoData]);

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
          <CollaboratorEqualizationItem
            key={colab.idColaborador}
            colab={colab}
            index={index}
            idCiclo={idCiclo}
            expandedIndex={expandedIndex}
            onToggleExpanded={handleToggleExpanded}
            onReview={handleReview}
            onApproveClick={handleApproveClick}
          />
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
