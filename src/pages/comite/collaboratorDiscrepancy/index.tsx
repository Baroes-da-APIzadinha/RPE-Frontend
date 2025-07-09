import { useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { ToggleBar } from "@/components/ToggleBar";
import { IoSparklesOutline } from "react-icons/io5";
import { FaUser, FaUsers, FaClipboardCheck } from "react-icons/fa";
import { collaboratorsMock } from "@/data/colaboradoresComite";

type TabType = "autoavaliacao" | "gestor" | "360";

// Mock data para demonstração
const mockEvaluationData = {
  autoavaliacao: {
    questions: [
      {
        question: "Como você avalia sua performance geral neste período?",
        answer: "Considero que tive uma performance sólida, cumprindo todas as metas estabelecidas e contribuindo ativamente para os projetos da equipe.",
        rating: 4.3
      },
      {
        question: "Quais foram seus principais desafios e como os superou?",
        answer: "O principal desafio foi adaptar-me às novas tecnologias do projeto. Dediquei tempo extra para estudar e busquei mentoria com colegas mais experientes.",
        rating: 4.0
      },
      {
        question: "Como você contribuiu para o desenvolvimento da equipe?",
        answer: "Compartilhei conhecimentos em sessões de code review e ajudei novos membros da equipe com onboarding técnico.",
        rating: 4.5
      }
    ]
  },
  gestor: {
    questions: [
      {
        question: "Avalie a performance técnica do colaborador",
        answer: "Demonstra excelente domínio técnico e capacidade de resolver problemas complexos. Suas entregas são sempre de alta qualidade.",
        rating: 4.0
      },
      {
        question: "Como avalia a colaboração e trabalho em equipe?",
        answer: "É um excelente colaborador, sempre disposto a ajudar os colegas e compartilhar conhecimento. Contribui positivamente para o ambiente de trabalho.",
        rating: 4.2
      },
      {
        question: "Pontos de melhoria identificados",
        answer: "Poderia ser mais proativo em sugerir melhorias nos processos da equipe e assumir mais responsabilidades de liderança técnica.",
        rating: 3.8
      }
    ]
  },
  colleagues360: [
    {
      name: "Ana Costa",
      role: "Product Owner",
      overallScore: 4.1,
      feedback: "Excelente colaborador, sempre disposto a ajudar e com grande conhecimento técnico. Comunicação clara e objetiva.",
      strengths: ["Conhecimento técnico", "Disponibilidade", "Comunicação"],
      improvements: ["Proatividade em reuniões", "Sugestões de melhorias"]
    },
    {
      name: "Pedro Santos",
      role: "Desenvolvedor Backend",
      overallScore: 3.8,
      feedback: "Bom colega de trabalho, me ajudou muito durante meu onboarding. Poderia ser mais assertivo nas discussões técnicas.",
      strengths: ["Mentoria", "Paciência", "Conhecimento técnico"],
      improvements: ["Assertividade", "Participação em discussões"]
    },
    {
      name: "Carla Mendes",
      role: "QA Analyst",
      overallScore: 4.2,
      feedback: "Trabalha muito bem em equipe e sempre entrega código de qualidade. Facilita muito nosso trabalho de QA.",
      strengths: ["Qualidade do código", "Colaboração", "Pontualidade"],
      improvements: ["Documentação", "Testes unitários"]
    }
  ]
};

export function CollaboratorDiscrepancy() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("autoavaliacao");
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Buscar dados do colaborador (mock)
  const collaborator = collaboratorsMock.find(c => c.nome === id) || collaboratorsMock[0];

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
        • Excelente domínio técnico e capacidade de resolver problemas complexos
        • Disponibilidade para ajudar colegas e compartilhar conhecimento
        • Entregas de alta qualidade e dentro do prazo
        • Boa comunicação e colaboração em equipe
        
        **Pontos de Melhoria:**
        • Maior proatividade em sugerir melhorias nos processos
        • Mais assertividade nas discussões técnicas
        • Assumir mais responsabilidades de liderança técnica
        • Melhorar documentação e cobertura de testes
        
        **Análise da Discrepância:**
        A discrepância de ${collaborator.discrepancy} pontos entre autoavaliação e avaliação 360° sugere que o colaborador pode estar sendo muito crítico consigo mesmo ou que há uma percepção ligeiramente diferente entre sua autopercepção e a percepção dos colegas.
      `);
      setLoadingSummary(false);
    }, 2000);
  };

  const renderAutoavaliacaoTab = () => (
    <S.EvaluationGrid>
      <S.EvaluationSection>
        <S.SectionTitle>
          <FaUser />
          Autoavaliação
        </S.SectionTitle>
        {mockEvaluationData.autoavaliacao.questions.map((item, index) => (
          <S.QuestionItem key={index}>
            <S.Question>{item.question}</S.Question>
            <S.Rating>
              <S.RatingValue>{item.rating}/5.0</S.RatingValue>
            </S.Rating>
            <S.Answer>{item.answer}</S.Answer>
          </S.QuestionItem>
        ))}
      </S.EvaluationSection>
      
      <S.EvaluationSection>
        <S.SectionTitle>
          <FaClipboardCheck />
          Avaliação do Gestor
        </S.SectionTitle>
        {mockEvaluationData.gestor.questions.map((item, index) => (
          <S.QuestionItem key={index}>
            <S.Question>{item.question}</S.Question>
            <S.Rating>
              <S.RatingValue>{item.rating}/5.0</S.RatingValue>
            </S.Rating>
            <S.Answer>{item.answer}</S.Answer>
          </S.QuestionItem>
        ))}
      </S.EvaluationSection>
    </S.EvaluationGrid>
  );

  const renderGestorTab = () => (
    <S.EvaluationSection>
      <S.SectionTitle>
        <FaClipboardCheck />
        Avaliação Detalhada do Gestor
      </S.SectionTitle>
      {mockEvaluationData.gestor.questions.map((item, index) => (
        <S.QuestionItem key={index}>
          <S.Question>{item.question}</S.Question>
          <S.Rating>
            <S.RatingValue>{item.rating}/5.0</S.RatingValue>
          </S.Rating>
          <S.Answer>{item.answer}</S.Answer>
        </S.QuestionItem>
      ))}
    </S.EvaluationSection>
  );

  const render360Tab = () => (
    <S.Evaluation360Container>
      {mockEvaluationData.colleagues360.map((colleague, index) => (
        <S.ColleagueEvaluation key={index}>
          <S.ColleagueName>
            <FaUser />
            {colleague.name}
            <S.ColleagueRole>({colleague.role})</S.ColleagueRole>
          </S.ColleagueName>
          
          <S.ScoreOverview>
            <S.ScoreLabel>Nota Geral:</S.ScoreLabel>
            <S.ScoreValue>{colleague.overallScore}/5.0</S.ScoreValue>
          </S.ScoreOverview>
          
          <S.QuestionItem>
            <S.Question>Feedback Geral</S.Question>
            <S.Answer>{colleague.feedback}</S.Answer>
          </S.QuestionItem>
          
          <S.QuestionItem>
            <S.Question>Pontos Fortes</S.Question>
            <S.Answer>
              <ul>
                {colleague.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </S.Answer>
          </S.QuestionItem>
          
          <S.QuestionItem>
            <S.Question>Pontos de Melhoria</S.Question>
            <S.Answer>
              <ul>
                {colleague.improvements.map((improvement, i) => (
                  <li key={i}>{improvement}</li>
                ))}
              </ul>
            </S.Answer>
          </S.QuestionItem>
        </S.ColleagueEvaluation>
      ))}
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
        <Card>
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
        </Card>
      )}

      <Card>
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
      </Card>
    </>
  );
}
