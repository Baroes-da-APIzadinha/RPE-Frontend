import { useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { ToggleBar } from "@/components/ToggleBar";
import TextArea from "@/components/Textarea";
import { StarRating } from "@/components/StarRating";
import EvaluationFrame from "@/components/EvaluationFrame";
import { Select } from "@/components/Select";
import { TableBase } from "@/components/TableBase";
import { IoSparklesOutline } from "react-icons/io5";
import { FaUser, FaUsers, FaClipboardCheck } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdAccountCircle } from "react-icons/md";
import Button from "@/components/Button";
import { useReferenciasPorIndicado } from "@/hooks/useReferenciasPorIndicado";
import { useColaboradorById } from "@/hooks/colaboradores/useColaboradorById";
import { useAvaliacaoColaborador, clearAvaliacaoColaboradorIACache, type AvaliacaoColaboradorIA } from "@/hooks/IA/useAvaliacaoColaborador";
import { useGetAvaliacoes } from "@/hooks/comite/useGetAvaliacoes";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { useEffect } from "react";
import { formatar } from "@/utils/formatters";
type TabType = "autoavaliacao" | "referencias" | "360";

const motivacoes = [
  { value: "Discordo Totalmente", label: "Discordo Totalmente" },
  { value: "Discordo Parcialmente", label: "Discordo Parcialmente" },
  { value: "Neutro", label: "Neutro" },
  { value: "Concordo Parcialmente", label: "Concordo Parcialmente" },
  { value: "Concordo Totalmente", label: "Concordo Totalmente" },
];

// Componente helper para buscar nome do avaliador
function AvaliadorName({ idAvaliador }: { idAvaliador: string }) {
  const { colaborador, loading } = useColaboradorById(idAvaliador);
  
  if (loading) {
    return <>Carregando...</>;
  }
  
  return <>{colaborador?.nomeCompleto || `Avaliador ${idAvaliador}`}</>;
}

export function CollaboratorDiscrepancy() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("autoavaliacao");
  const [summary, setSummary] = useState<AvaliacaoColaboradorIA | null>(null);
  const [open, setOpen] = useState<string[]>([]);
  const [shouldLoadIA, setShouldLoadIA] = useState(false);

  // Decodificar o ID do colaborador da URL
  const colaboradorId = decodeURIComponent(id || "");
  const { colaborador } = useColaboradorById(colaboradorId);
  
  // Obtém ciclo atual
  const { cicloAtual } = useCicloAtual();
  const idCiclo = cicloAtual?.id ?? "";

  // Hook para buscar referências reais usando o ID do colaborador
  const { referencias, loading: loadingReferencias, error: errorReferencias } = useReferenciasPorIndicado(colaboradorId);

  // Hook para buscar avaliações reais
  const { data: avaliacoes, loading: loadingAvaliacoes, error: errorAvaliacoes } = useGetAvaliacoes(colaboradorId, idCiclo);
  console.log("Avaliações carregadas:", errorAvaliacoes);
  // Hook para buscar avaliação da IA - só carrega quando shouldLoadIA for true
  const { data: avaliacaoIA, loading: loadingIA, error: errorIA } = useAvaliacaoColaborador(
    shouldLoadIA ? colaboradorId : "", 
    shouldLoadIA ? idCiclo : ""
  );

  // Definir primeiro item aberto quando avaliacoes carregarem
  useEffect(() => {
    if (avaliacoes && avaliacoes.length > 0 && open.length === 0) {
      const autoAvaliacao = avaliacoes.find(av => av.tipoAvaliacao === "AUTOAVALIACAO");
      const liderColaborador = avaliacoes.find(av => av.tipoAvaliacao === "LIDER_COLABORADOR");

      const primeiroCard = autoAvaliacao?.autoAvaliacao?.cardAutoAvaliacoes?.[0] || 
                          liderColaborador?.avaliacaoLiderColaborador?.cardAvaliacaoLiderColaborador?.[0];
      
      if (primeiroCard) {
        setOpen(prev => [...prev, primeiroCard.idCardAvaliacao]);
      }
    }
  }, [avaliacoes]);

  // Atualizar summary quando dados da IA chegarem
  useEffect(() => {
    if (avaliacaoIA && shouldLoadIA) {
      setSummary(avaliacaoIA);
    } else if (errorIA && shouldLoadIA) {
      setSummary(null);
    }
  }, [avaliacaoIA, shouldLoadIA, errorIA]);

  // Limpar cache ao sair da página
  useEffect(() => {
    return () => {
      clearAvaliacaoColaboradorIACache();
    };
  }, []);


  const handleAccordion = (id: string) => {
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const tabItems = [
    {
      value: "autoavaliacao",
      label: "Revisão do Gestor",
      icon: <FaUser />
    },
     {
      value: "360",
      label: "Avaliação 360°",
      icon: <FaUsers />
    },
    {
      value: "referencias",
      label: "Referencias",
      icon: <FaClipboardCheck />
    }
  ];

  const handleGenerateSummary = async () => {
    if (!colaboradorId || !idCiclo) return;
    
    // Ativar carregamento da IA
    setShouldLoadIA(true);
    setSummary(null);
  };

  const renderAutoavaliacaoTab = () => {
    if (loadingAvaliacoes) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Carregando avaliações...</p>
        </div>
      );
    }

    if (errorAvaliacoes) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Erro ao carregar avaliações: {errorAvaliacoes}</p>
        </div>
      );
    }

    if (!avaliacoes || avaliacoes.length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Nenhuma avaliação encontrada para este colaborador.</p>
        </div>
      );
    }

    // Separar avaliações por tipo
    const autoAvaliacao = avaliacoes.find(av => av.tipoAvaliacao === "AUTOAVALIACAO");
    const liderColaborador = avaliacoes.find(av => av.tipoAvaliacao === "LIDER_COLABORADOR");

    if (!autoAvaliacao?.autoAvaliacao && !liderColaborador?.avaliacaoLiderColaborador) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Dados de autoavaliação e avaliação do gestor não encontrados.</p>
        </div>
      );
    }

    // Obter critérios da autoavaliação ou da avaliação do gestor
    const criterios = autoAvaliacao?.autoAvaliacao?.cardAutoAvaliacoes || 
                     liderColaborador?.avaliacaoLiderColaborador?.cardAvaliacaoLiderColaborador || 
                     [];

    return (
      <>
        <EvaluationFrame title="Critérios de Avaliação">
          {criterios.map((criterio) => {
            const isOpen = open.includes(criterio.idCardAvaliacao);
            const autoCard = autoAvaliacao?.autoAvaliacao?.cardAutoAvaliacoes?.find(c => c.nomeCriterio === criterio.nomeCriterio);
            const gestorCard = liderColaborador?.avaliacaoLiderColaborador?.cardAvaliacaoLiderColaborador?.find(c => c.nomeCriterio === criterio.nomeCriterio);
            
            return (
              <Card key={criterio.idCardAvaliacao}>
                <S.CriterioHeader>
                  <S.SectionTitle>{criterio.nomeCriterio}</S.SectionTitle>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <S.NotaBadge $visible={!isOpen}>
                      {autoCard?.nota || "-"}
                    </S.NotaBadge>
                    <S.NotaBadge $visible={!isOpen}>
                      {gestorCard?.nota || "-"}
                    </S.NotaBadge>
                    <S.ToggleIcon
                      $open={isOpen}
                      onClick={() => handleAccordion(criterio.idCardAvaliacao)}
                      tabIndex={0}
                      role="button"
                      aria-label={
                        isOpen ? "Fechar critério" : "Abrir critério"
                      }
                    >
                      {isOpen ? (
                        <MdKeyboardArrowUp size={36} />
                      ) : (
                        <MdKeyboardArrowDown size={36} />
                      )}
                    </S.ToggleIcon>
                  </div>
                </S.CriterioHeader>
                {isOpen && (
                  <S.CriteriaContent>
                    {/* Autoavaliação */}
                    {autoCard && (
                      <S.CriteriaSection>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <S.Subtitle>Autoavaliação</S.Subtitle>
                          <S.NotaBadge style={{ marginLeft: "auto" }}>
                            {autoCard.nota}
                          </S.NotaBadge>
                        </div>
                        <StarRating
                          value={parseFloat(autoCard.nota)}
                          readOnly
                        />
                        <TextArea
                          value={autoCard.justificativa || ""}
                          readOnly
                          placeholder="Justificativa da autoavaliação"
                          rows={4}
                        />
                      </S.CriteriaSection>
                    )}
                    {/* Avaliação do Gestor */}
                    {gestorCard && (
                      <S.CriteriaSection>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <S.Subtitle>Avaliação do Gestor</S.Subtitle>
                          <S.NotaBadge style={{ marginLeft: "auto" }}>
                            {gestorCard.nota}
                          </S.NotaBadge>
                        </div>
                        <StarRating
                          value={parseFloat(gestorCard.nota)}
                          readOnly
                        />
                        <TextArea
                          value={gestorCard.justificativa || ""}
                          readOnly
                          placeholder="Justificativa do gestor"
                          rows={4}
                        />
                      </S.CriteriaSection>
                    )}
                  </S.CriteriaContent>
                )}
              </Card>
            );
          })}
        </EvaluationFrame>
      </>
    );
  };

  const renderReferencesTab = () => {
    if (loadingReferencias) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Carregando referências...</p>
        </div>
      );
    }

    if (errorReferencias) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Erro ao carregar referências: {errorReferencias}</p>
        </div>
      );
    }

    if (!referencias || referencias.length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Nenhuma referência encontrada para este colaborador.</p>
        </div>
      );
    }

    return (
      <TableBase
        title="Referencias"
        subtitle={`${referencias.length} referências encontradas para este colaborador`}
      >
        {referencias.map((referencia) => (
          <S.ReferenciaRow key={referencia.idIndicacao}>
            <S.ReferenciaInfo>
              <MdAccountCircle size={48} />
              <S.ReferenciaDetails>
                <S.ReferenciaIndicador>{referencia.indicador.nomeCompleto}</S.ReferenciaIndicador>
                <S.ReferenciaCargo>{formatar(referencia.indicador.cargo)}</S.ReferenciaCargo>
                <S.ReferenciaData>
                  {formatar(referencia.indicador.unidade)}
                </S.ReferenciaData>
              </S.ReferenciaDetails>
            </S.ReferenciaInfo>
            
            <S.ReferenciaContent>
              <S.ReferenciaJustificativa>{referencia.justificativa}</S.ReferenciaJustificativa>
            </S.ReferenciaContent>
            
            <S.ReferenciaActions>
              <S.TipoBadge $tipo={referencia.tipo === 'TECNICA' ? 'Técnica' : 'Cultural'}>
                {referencia.tipo === 'TECNICA' ? 'Técnica' : 'Cultural'}
              </S.TipoBadge>
            </S.ReferenciaActions>
          </S.ReferenciaRow>
        ))}
      </TableBase>
    );
  };

  const render360Tab = () => {
    if (loadingAvaliacoes) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Carregando avaliações 360°...</p>
        </div>
      );
    }

    if (errorAvaliacoes) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Erro ao carregar avaliações 360°: {errorAvaliacoes}</p>
        </div>
      );
    }

    // Filtrar apenas avaliações de pares (360°)
    const avaliacoes360 = avaliacoes?.filter(av => av.tipoAvaliacao === "AVALIACAO_PARES") || [];

    if (avaliacoes360.length === 0) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Nenhuma avaliação 360° encontrada para este colaborador.</p>
        </div>
      );
    }

    return (
      <S.Evaluation360Container>
        {avaliacoes360.map((avaliacao) => (
          <Card key={avaliacao.idAvaliacao}>
            <S.CriterioHeader>
              <S.ColleagueName>
                <MdAccountCircle size={24} />
                <AvaliadorName idAvaliador={avaliacao.idAvaliador} />
                <S.ColleagueRole>
                  (Avaliação de Pares)
                </S.ColleagueRole>
              </S.ColleagueName>
              <S.NotaBadge>
                {avaliacao.avaliacaoPares?.nota || "-"}
              </S.NotaBadge>
            </S.CriterioHeader>
            
            <S.CriteriaContent>
              {/* Avaliação Geral */}
              <S.CriteriaSection>
                <S.Subtitle>Nota de 1 a 5 dada ao colaborador: </S.Subtitle>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                  <StarRating
                    value={parseFloat(avaliacao.avaliacaoPares?.nota || "0")}
                    readOnly
                  />
                  <S.NotaBadge>
                    {avaliacao.avaliacaoPares?.nota || "-"}
                  </S.NotaBadge>
                </div>
              </S.CriteriaSection>
              
              {/* Motivação para trabalhar novamente */}
              <S.CriteriaSection>
                <S.Subtitle>Ficaria motivado em trabalhar novamente?</S.Subtitle>
                <Select
                  onChange={() => {}}
                  value={avaliacao.avaliacaoPares?.motivadoTrabalharNovamente || ""}
                  options={motivacoes}
                  disabled
                />
              </S.CriteriaSection>
            </S.CriteriaContent>
            
            <S.Divider />
            
            <S.CriteriaContent>
              {/* Pontos Fortes */}
              <S.CriteriaSection>
                <S.Subtitle>Pontos que faz bem e deve explorar</S.Subtitle>
                <TextArea
                  value={avaliacao.avaliacaoPares?.pontosFortes || ""}
                  readOnly
                  rows={4}
                />
              </S.CriteriaSection>
              
              {/* Pontos de Melhoria */}
              <S.CriteriaSection>
                <S.Subtitle>Pontos de melhoria</S.Subtitle>
                <TextArea
                  value={avaliacao.avaliacaoPares?.pontosFracos || ""}
                  readOnly
                  rows={4}
                />
              </S.CriteriaSection>
            </S.CriteriaContent>
          </Card>
        ))}
      </S.Evaluation360Container>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "autoavaliacao":
        return renderAutoavaliacaoTab();
      case "referencias":
        return renderReferencesTab();
      case "360":
        return render360Tab();
      default:
        return renderAutoavaliacaoTab();
    }
  };

  // Buscar nome do colaborador pelos dados das referências ou usar o ID

  return (
    <>
      <S.Header>
        <Title>Análise de Discrepância: <br/> {colaborador?.nomeCompleto || "GAEL"}</Title>
        <Button onClick={handleGenerateSummary} variant="primary">
          <IoSparklesOutline size={24}/>
          Gerar Resumo IA
        </Button>
      </S.Header>

      {(summary || loadingIA) && (
        <div>
          <S.SummaryCard>
            <S.SummaryTitle>
              <IoSparklesOutline />
              Resumo Gerado por IA
            </S.SummaryTitle>
            <S.SummaryContent>
              {loadingIA ? (
                <div className="loading">
                  <IoSparklesOutline />
                  Gerando resumo...
                </div>
              ) : errorIA ? (
                <>
                  <strong>Erro ao carregar avaliação da IA</strong>
                  <span>Não foi possível gerar o resumo automaticamente. Tente novamente mais tarde.</span>
                </>
              ) : summary ? (
                <S.SummaryDetailsWrapper>
                  <S.SummaryScoreBox>
                    <S.SummaryScoreLabel>Nota Final Sugerida</S.SummaryScoreLabel>
                    <S.SummaryScoreValue>{summary.notaFinalSugerida}/5</S.SummaryScoreValue>
                  </S.SummaryScoreBox>
                  
                  <S.SummarySection>
                    <S.SummarySectionTitle>Análise Detalhada</S.SummarySectionTitle>
                    <S.SummarySectionContent>{summary.analiseDetalhada}</S.SummarySectionContent>
                  </S.SummarySection>
                  
                  <S.SummarySection>
                    <S.SummarySectionTitle>Resumo Executivo</S.SummarySectionTitle>
                    <S.SummarySectionContent>{summary.resumoExecutivo}</S.SummarySectionContent>
                  </S.SummarySection>
                </S.SummaryDetailsWrapper>
              ) : null}
            </S.SummaryContent>
          </S.SummaryCard>
        </div>
      )}

      <div>
        <S.TabContainer>
          <ToggleBar
            items={tabItems}
            value={activeTab}
            onChange={(value) => setActiveTab(value as TabType)}
          />
        </S.TabContainer>
        
        <S.TabContent>
          {renderTabContent()}
        </S.TabContent>
      </div>
    </>
  );
}
