import { useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { ToggleBar } from "@/components/ToggleBar";
import TextArea from "@/components/Textarea";
import { StarRating } from "@/components/StarRating";
import EvaluationFrame from "@/components/EvaluationFrame";
import RowProgressBox from "@/components/RowProgressBox";
import { IoSparklesOutline } from "react-icons/io5";
import { FaUser, FaUsers, FaClipboardCheck } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { collaboratorsMock } from "@/data/colaboradoresComite";
import { useCountAvaliacoes } from "@/hooks/colaboradores/useCountAvaliacoes";

type TabType = "autoavaliacao" | "gestor" | "360";

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
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [open, setOpen] = useState<string[]>([criteriosMock[0].id]);

  // Buscar dados do colaborador (mock)
  const collaborator = collaboratorsMock.find(c => c.nome === id) || collaboratorsMock[0];

  const totalCriterios = criteriosMock.length;
  const criteriosAvaliados = criteriosMock.length; // Todos já foram avaliados para visualização

  const handleAccordion = (id: string) => {
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const tabItems = [
    {
      value: "autoavaliacao",
      label: "Autoavaliação x Gestor",
      icon: <FaUser />
    },
    {
      value: "gestor",
      label: "Revisão do Gestor",
      icon: <FaClipboardCheck />
    },
    {
      value: "360",
      label: "Avaliação 360°",
      icon: <FaUsers />
    }
  ];

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    // Simular chamada para API
    setTimeout(() => {
      setSummary(`
        **Resumo Geral - ${collaborator.nome}**
        
        **Pontos Fortes:**
        • Excelente pontualidade e assiduidade
        • Boa comunicação e colaboração em equipe
        • Qualidade técnica sólida
        • Uso de ferramentas organizacionais
        
        **Pontos de Melhoria:**
        • Planejamento de longo prazo
        • Proatividade em liderança
        • Revisão de código dos colegas
        • Desenvolvimento de habilidades de liderança
        
        **Análise da Discrepância:**
        A discrepância de ${collaborator.discrepancy} pontos sugere que há diferenças na percepção entre autoavaliação e avaliação do gestor. O colaborador tende a se avaliar ligeiramente mais alto em alguns critérios.
      `);
      setLoadingSummary(false);
    }, 2000);
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

  const renderGestorTab = () => (
    <S.EvaluationSection>
      <S.SectionTitle>
        <FaClipboardCheck />
        Avaliação Detalhada do Gestor
      </S.SectionTitle>
      <p>Conteúdo da aba Gestor - A implementar</p>
    </S.EvaluationSection>
  );

  const render360Tab = () => (
    <S.Evaluation360Container>
      <p>Conteúdo da aba 360° - A implementar</p>
    </S.Evaluation360Container>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "autoavaliacao":
        return renderAutoavaliacaoTab();
      case "gestor":
        return renderGestorTab();
      case "360":
        return render360Tab();
      default:
        return renderAutoavaliacaoTab();
    }
  };

  return (
    <>
      <S.Header>
        <Title>Análise de Discrepância - {collaborator.nome}</Title>
        <S.GenerateSummaryButton onClick={handleGenerateSummary}>
          <IoSparklesOutline />
          Gerar Resumo IA
        </S.GenerateSummaryButton>
      </S.Header>

      {(summary || loadingSummary) && (
        <div>
          <S.SummaryCard>
            <S.SummaryTitle>
              <IoSparklesOutline />
              Resumo Gerado por IA
            </S.SummaryTitle>
            <S.SummaryContent>
              {loadingSummary ? (
                <div className="loading">
                  <IoSparklesOutline />
                  Gerando resumo...
                </div>
              ) : (
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                  {summary}
                </pre>
              )}
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
