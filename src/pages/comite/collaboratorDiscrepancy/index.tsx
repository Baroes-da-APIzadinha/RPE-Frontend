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
import { collaboratorsMock } from "@/data/colaboradoresComite";
import Button from "@/components/Button";

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

// Mock data para referencias
const referenciasMock = [
  {
    id: "1",
    justificativa: "Excelente profissional com grande conhecimento técnico em React e Node.js. Sempre entrega projetos de alta qualidade dentro do prazo estabelecido.",
    tipo: "Técnica",
    indicadoPor: "Maria Silva",
    cargo: "Tech Lead",
    dataIndicacao: "2024-01-15"
  },
  {
    id: "2",
    justificativa: "Pessoa muito colaborativa e que sempre ajuda os colegas. Tem uma postura muito positiva e contribui para um ambiente de trabalho saudável.",
    tipo: "Cultural",
    indicadoPor: "João Santos",
    cargo: "Product Manager",
    dataIndicacao: "2024-01-20"
  },
  {
    id: "3",
    justificativa: "Demonstra liderança natural e capacidade de resolver conflitos. Sempre busca soluções criativas para os desafios do projeto.",
    tipo: "Cultural",
    indicadoPor: "Ana Costa",
    cargo: "Scrum Master",
    dataIndicacao: "2024-02-01"
  },
  {
    id: "4",
    justificativa: "Possui conhecimento avançado em arquitetura de software e melhores práticas de desenvolvimento. Contribui significativamente para a qualidade do código.",
    tipo: "Técnica",
    indicadoPor: "Carlos Mendes",
    cargo: "Senior Developer",
    dataIndicacao: "2024-02-10"
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
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [open, setOpen] = useState<string[]>([criteriosMock[0].id]);

  // Buscar dados do colaborador (mock)
  const collaborator = collaboratorsMock.find(c => c.nome === id) || collaboratorsMock[0];


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

  const renderReferencesTab = () => (
    <TableBase
      title="Referencias"
      subtitle={`${referenciasMock.length} referências encontradas para este colaborador`}
    >
      {referenciasMock.map((referencia) => (
        <S.ReferenciaRow key={referencia.id}>
          <S.ReferenciaInfo>
            <MdAccountCircle size={48} />
            <S.ReferenciaDetails>
              <S.ReferenciaIndicador>{referencia.indicadoPor}</S.ReferenciaIndicador>
              <S.ReferenciaCargo>{referencia.cargo}</S.ReferenciaCargo>
              <S.ReferenciaData>
              </S.ReferenciaData>
            </S.ReferenciaDetails>
          </S.ReferenciaInfo>
          
          <S.ReferenciaContent>
            <S.ReferenciaJustificativa>{referencia.justificativa}</S.ReferenciaJustificativa>
          </S.ReferenciaContent>
          
          <S.ReferenciaActions>
            <S.TipoBadge $tipo={referencia.tipo}>
              {referencia.tipo}
            </S.TipoBadge>
          </S.ReferenciaActions>
        </S.ReferenciaRow>
      ))}
    </TableBase>
  );

  const render360Tab = () => (
    <S.Evaluation360Container>
      {avaliacoes360Mock.map((avaliacao) => (
        <Card key={avaliacao.id}>
          <S.CriterioHeader>
            <S.ColleagueName>
              <MdAccountCircle size={24} />
              {avaliacao.avaliador.nome}
              <S.ColleagueRole>
                ({avaliacao.avaliador.cargo} • {avaliacao.avaliador.unidade})
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

  return (
    <>
      <S.Header>
        <Title>Análise de Discrepância - {collaborator.nome}</Title>
        <Button onClick={handleGenerateSummary} variant="primary">
          <IoSparklesOutline size={24}/>
          Gerar Resumo IA
        </Button>
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
