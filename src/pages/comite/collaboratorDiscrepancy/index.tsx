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
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { useEffect } from "react";
import { formatar } from "@/utils/formatters";
type TabType = "autoavaliacao" | "referencias" | "360";

// Mock data baseado na estrutura do CollaboratorReview
const criteriosMock = [
  {
    id: "1",
    nome: "Qualidade do trabalho",
    pilar: "Postura"
  },
  {
    id: "2", 
    nome: "Pontualidade e assiduidade",
    pilar: "Postura"
  },
  {
    id: "3",
    nome: "Organização e planejamento",
    pilar: "Logistica"
  },
  {
    id: "4",
    nome: "Comunicação efetiva",
    pilar: "Logistica"
  },
  {
    id: "5",
    nome: "Liderança e tomada de decisão",
    pilar: "Gestão e Liderança"
  }
];

const autoavaliacaoMock = [
  { id: "1", nota: 4.2, justificativa: "Considero que mantenho um alto padrão de qualidade em minhas entregas, sempre revisando meu trabalho antes de finalizar." },
  { id: "2", nota: 4.5, justificativa: "Sempre chego no horário e raramente falto. Acredito ser um ponto forte meu." },
  { id: "3", nota: 3.8, justificativa: "Tenho me esforçado para melhorar minha organização, usando ferramentas como Trello para organizar tarefas." },
  { id: "4", nota: 4.0, justificativa: "Procuro ser claro e objetivo em minhas comunicações, tanto verbal quanto escrita." },
  { id: "5", nota: 3.5, justificativa: "Ainda estou desenvolvendo minhas habilidades de liderança, mas tenho tomado iniciativas em projetos menores." }
];

const avaliacaoGestorMock = [
  { id: "1", nota: 4.0, justificativa: "Demonstra excelente qualidade técnica, mas pode melhorar na revisão de código dos colegas." },
  { id: "2", nota: 4.8, justificativa: "Exemplar em pontualidade. Nunca teve problemas de atraso ou falta injustificada." },
  { id: "3", nota: 3.5, justificativa: "Melhorou significativamente sua organização, mas ainda pode aprimorar o planejamento de longo prazo." },
  { id: "4", nota: 4.2, justificativa: "Comunicação clara e efetiva. Boa participação em reuniões e apresentações." },
  { id: "5", nota: 3.2, justificativa: "Mostra potencial de liderança, mas precisa ser mais proativo em assumir responsabilidades." }
];

// Mock data para avaliações 360°
const avaliacoes360Mock = [
  {
    id: "1",
    avaliador: {
      nome: "Ana Costa",
      cargo: "Product Owner",
      unidade: "Tech"
    },
    nota: 4.1,
    motivadoTrabalharNovamente: "Concordo Parcialmente",
    pontosFortes: "Excelente colaborador, sempre disposto a ajudar e com grande conhecimento técnico. Comunicação clara e objetiva durante os projetos.",
    pontosFracos: "Poderia ser mais proativo em reuniões e sugerir melhorias nos processos da equipe com mais frequência."
  },
  {
    id: "2", 
    avaliador: {
      nome: "Pedro Santos",
      cargo: "Desenvolvedor Backend",
      unidade: "Tech"
    },
    nota: 3.8,
    motivadoTrabalharNovamente: "Concordo Totalmente",
    pontosFortes: "Bom colega de trabalho, me ajudou muito durante meu onboarding. Tem paciência para explicar conceitos técnicos complexos.",
    pontosFracos: "Poderia ser mais assertivo nas discussões técnicas e participar mais ativamente das decisões arquiteturais."
  },
  {
    id: "3",
    avaliador: {
      nome: "Carla Mendes", 
      cargo: "QA Analyst",
      unidade: "Tech"
    },
    nota: 4.2,
    motivadoTrabalharNovamente: "Concordo Totalmente",
    pontosFortes: "Trabalha muito bem em equipe e sempre entrega código de qualidade. Facilita muito nosso trabalho de QA com suas entregas bem documentadas.",
    pontosFracos: "Poderia melhorar a cobertura de testes unitários e a documentação técnica dos componentes desenvolvidos."
  }
];

const motivacoes = [
  { value: "Discordo Totalmente", label: "Discordo Totalmente" },
  { value: "Discordo Parcialmente", label: "Discordo Parcialmente" },
  { value: "Neutro", label: "Neutro" },
  { value: "Concordo Parcialmente", label: "Concordo Parcialmente" },
  { value: "Concordo Totalmente", label: "Concordo Totalmente" },
];

// Agrupamento dos critérios por pilar
const criteriosPorPilar = [
  {
    titulo: "Postura",
    criterios: criteriosMock.filter((c) => ["1", "2"].includes(c.id)),
    autoavaliacao: autoavaliacaoMock.filter((c) => ["1", "2"].includes(c.id)),
    avaliacaoGestor: avaliacaoGestorMock.filter((c) => ["1", "2"].includes(c.id)),
  },
  {
    titulo: "Logistica",
    criterios: criteriosMock.filter((c) => ["3", "4"].includes(c.id)),
    autoavaliacao: autoavaliacaoMock.filter((c) => ["3", "4"].includes(c.id)),
    avaliacaoGestor: avaliacaoGestorMock.filter((c) => ["3", "4"].includes(c.id)),
  },
  {
    titulo: "Gestão e Liderança",
    criterios: criteriosMock.filter((c) => ["5"].includes(c.id)),
    autoavaliacao: autoavaliacaoMock.filter((c) => ["5"].includes(c.id)),
    avaliacaoGestor: avaliacaoGestorMock.filter((c) => ["5"].includes(c.id)),
  },
];

export function CollaboratorDiscrepancy() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("autoavaliacao");
  const [summary, setSummary] = useState<AvaliacaoColaboradorIA | null>(null);
  const [open, setOpen] = useState<string[]>([criteriosMock[0].id]);
  const [shouldLoadIA, setShouldLoadIA] = useState(false);

  // Decodificar o ID do colaborador da URL
  const colaboradorId = decodeURIComponent(id || "");
  const { colaborador } = useColaboradorById(colaboradorId);
  
  // Obtém ciclo atual
  const { cicloAtual } = useCicloAtual();
  const idCiclo = cicloAtual?.id ?? "";

  // Hook para buscar referências reais usando o ID do colaborador
  const { referencias, loading: loadingReferencias, error: errorReferencias } = useReferenciasPorIndicado(colaboradorId);

  // Hook para buscar avaliação da IA - só carrega quando shouldLoadIA for true
  const { data: avaliacaoIA, loading: loadingIA, error: errorIA } = useAvaliacaoColaborador(
    shouldLoadIA ? colaboradorId : "", 
    shouldLoadIA ? idCiclo : ""
  );

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

  const renderAutoavaliacaoTab = () => (
    <>
      {criteriosPorPilar.map((pilar) => (
        <EvaluationFrame key={pilar.titulo} title={pilar.titulo}>
          {pilar.criterios.map((criterio) => {
            const isOpen = open.includes(criterio.id);
            const autoavaliacao = pilar.autoavaliacao.find((a) => a.id === criterio.id);
            const avaliacaoGestor = pilar.avaliacaoGestor.find((a) => a.id === criterio.id);
            
            return (
              <Card key={criterio.id}>
                <S.CriterioHeader>
                  <S.SectionTitle>{criterio.nome}</S.SectionTitle>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <S.NotaBadge $visible={!isOpen}>
                      {(autoavaliacao?.nota ?? 0).toFixed(1)}
                    </S.NotaBadge>
                    <S.NotaBadge $visible={!isOpen}>
                      {(avaliacaoGestor?.nota ?? 0).toFixed(1)}
                    </S.NotaBadge>
                    <S.ToggleIcon
                      $open={isOpen}
                      onClick={() => handleAccordion(criterio.id)}
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
                          {(autoavaliacao?.nota ?? 0).toFixed(1)}
                        </S.NotaBadge>
                      </div>
                      <StarRating
                        value={autoavaliacao?.nota ?? 0}
                        readOnly
                      />
                      <TextArea
                        value={autoavaliacao?.justificativa || ""}
                        readOnly
                        placeholder="Justificativa da autoavaliação"
                        rows={4}
                      />
                    </S.CriteriaSection>
                    {/* Avaliação do Gestor */}
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
                          {(avaliacaoGestor?.nota ?? 0).toFixed(1)}
                        </S.NotaBadge>
                      </div>
                      <StarRating
                        value={avaliacaoGestor?.nota ?? 0}
                        readOnly
                      />
                      <TextArea
                        value={avaliacaoGestor?.justificativa || ""}
                        readOnly
                        placeholder="Justificativa do gestor"
                        rows={4}
                      />
                    </S.CriteriaSection>
                  </S.CriteriaContent>
                )}
              </Card>
            );
          })}
        </EvaluationFrame>
      ))}
    </>
  );

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

  const render360Tab = () => (
    <S.Evaluation360Container>
      {avaliacoes360Mock.map((avaliacao) => (
        <Card key={avaliacao.id}>
          <S.CriterioHeader>
            <S.ColleagueName>
              <MdAccountCircle size={24} />
              {avaliacao.avaliador.nome}
              <S.ColleagueRole>
                ({formatar(avaliacao.avaliador.cargo)} • {formatar(avaliacao.avaliador.unidade)})
              </S.ColleagueRole>
            </S.ColleagueName>
            <S.NotaBadge>
              {avaliacao.nota.toFixed(1)}
            </S.NotaBadge>
          </S.CriterioHeader>
          
          <S.CriteriaContent>
            {/* Avaliação Geral */}
            <S.CriteriaSection>

              <S.Subtitle>Nota de 1 a 5 dada ao colaborador: </S.Subtitle>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
              <StarRating
                value={avaliacao.nota}
                readOnly
                />
              <S.NotaBadge>
              {avaliacao.nota.toFixed(1)}
            </S.NotaBadge>
                </div>
            </S.CriteriaSection>
            
            {/* Motivação para trabalhar novamente */}
            <S.CriteriaSection>
              <S.Subtitle>Ficaria motivado em trabalhar novamente?</S.Subtitle>
              <Select
                onChange={() => {}}
                value={avaliacao.motivadoTrabalharNovamente}
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
                value={avaliacao.pontosFortes}
                readOnly
                rows={4}
              />
            </S.CriteriaSection>
            
            {/* Pontos de Melhoria */}
            <S.CriteriaSection>
              <S.Subtitle>Pontos de melhoria</S.Subtitle>
              <TextArea
                value={avaliacao.pontosFracos}
                readOnly
                rows={4}
              />
            </S.CriteriaSection>
          </S.CriteriaContent>
        </Card>
      ))}
    </S.Evaluation360Container>
  );

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
        <Title>Análise de Discrepância - {colaborador?.nomeCompleto || "GAEL"}</Title>
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
