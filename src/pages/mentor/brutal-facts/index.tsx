import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { Title } from "@/components/Title";
import Button from "@/components/Button";
import { MdAccountCircle, MdArrowBack, MdFileDownload } from "react-icons/md";
import { formatar } from "@/utils/formatters";

// Mock data para o mentorado
const mentoradoMock = {
  id: "1",
  nome: "Ana Silva Costa",
  cargo: "Desenvolvedor Frontend Junior",
  unidade: "Tecnologia",
  desempenho: 4.2,
  dataInicio: "2024-01-15",
  ultimaAvaliacao: "2024-06-15"
};

// Mock data para o relatório de Brutal Facts
const brutalFactsReport = {
  geradoEm: "2024-06-25T10:30:00Z",
  resumoExecutivo: `Ana Silva Costa demonstra um perfil profissional promissor como Desenvolvedor Frontend Junior, com forte potencial de crescimento e adaptabilidade. Sua trajetória nos últimos 6 meses revela uma evolução consistente em competências técnicas e comportamentais, destacando-se pela proatividade e capacidade de aprendizado.`,
  
  pontosFortes: [
    "Excelente capacidade de aprendizado e adaptação a novas tecnologias",
    "Proatividade na busca por soluções e melhorias nos processos",
    "Boa comunicação com a equipe e colaboração efetiva",
    "Organização e cumprimento de prazos estabelecidos",
    "Interesse genuíno em desenvolvimento profissional e feedback"
  ],
  
  areasDeDesenvolvimento: [
    "Aprofundamento em conceitos avançados de JavaScript e TypeScript",
    "Melhoria na estruturação de código para projetos de maior complexidade",
    "Desenvolvimento de habilidades de liderança técnica",
    "Aprimoramento na documentação técnica e comunicação de soluções"
  ],
  
  recomendacoes: [
    "Participar de projetos mais complexos para acelerar o desenvolvimento técnico",
    "Considerar mentorias técnicas específicas em arquitetura frontend",
    "Buscar certificações relevantes em frameworks utilizados pela empresa",
    "Assumir gradualmente responsabilidades de revisão de código de outros desenvolvedores"
  ],
  
  proximosPassos: `Recomenda-se que Ana seja incluída em projetos de maior complexidade técnica nos próximos 3 meses, com acompanhamento quinzenal para avaliação do progresso. Estabelecer metas claras de desenvolvimento técnico e comportamental, com foco em liderança técnica e mentoria de desenvolvedores mais júniores.`,
  
  avaliacaoGeral: `Ana apresenta um perfil sólido para evolução na carreira, com características que indicam potencial para assumir posições de maior responsabilidade técnica no médio prazo. Sua dedicação e postura profissional são exemplares, necessitando apenas de experiências mais desafiadoras para consolidar seu crescimento.`
};

export function BrutalFactsPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleExportPDF = () => {
    // Aqui seria implementada a lógica para exportar PDF
    // Por enquanto, apenas um placeholder
    alert("Funcionalidade de exportação PDF será implementada pelo backend");
  };
  
  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <Title>Brutal Facts Report</Title>
          <S.MentoradoInfo>
            <S.Avatar>
              <MdAccountCircle size={48} />
            </S.Avatar>
            <S.MentoradoDetails>
              <S.MentoradoNome>{mentoradoMock.nome}</S.MentoradoNome>
              <S.MentoradoCargo>{formatar(mentoradoMock.cargo)}</S.MentoradoCargo>
              <S.MentoradoUnidade>{formatar(mentoradoMock.unidade)}</S.MentoradoUnidade>
            </S.MentoradoDetails>
          </S.MentoradoInfo>
        </S.HeaderContent>
        
        <S.ActionsSection>
          <Button 
            onClick={handleBack}
            variant="secondary"
          >
            <MdArrowBack style={{ marginRight: '0.5rem' }} />
            Voltar
          </Button>
          <Button 
            onClick={handleExportPDF}
            variant="primary"
          >
            <MdFileDownload style={{ marginRight: '0.5rem' }} />
            Exportar PDF
          </Button>
        </S.ActionsSection>
      </S.Header>

      <S.ReportContent>
        <S.ReportTitle>Relatório de Avaliação Comportamental</S.ReportTitle>
        
        <S.ReportSection>
          <S.SectionTitle>Resumo Executivo</S.SectionTitle>
          <S.SectionContent>
            <p>{brutalFactsReport.resumoExecutivo}</p>
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Pontos Fortes</S.SectionTitle>
          <S.SectionContent>
            <ul>
              {brutalFactsReport.pontosFortes.map((ponto, index) => (
                <li key={index}>{ponto}</li>
              ))}
            </ul>
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Áreas de Desenvolvimento</S.SectionTitle>
          <S.SectionContent>
            <ul>
              {brutalFactsReport.areasDeDesenvolvimento.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Recomendações</S.SectionTitle>
          <S.SectionContent>
            <ul>
              {brutalFactsReport.recomendacoes.map((recomendacao, index) => (
                <li key={index}>{recomendacao}</li>
              ))}
            </ul>
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Próximos Passos</S.SectionTitle>
          <S.HighlightBox>
            <S.SectionContent>
              <p>{brutalFactsReport.proximosPassos}</p>
            </S.SectionContent>
          </S.HighlightBox>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Avaliação Geral</S.SectionTitle>
          <S.SectionContent>
            <p>{brutalFactsReport.avaliacaoGeral}</p>
          </S.SectionContent>
        </S.ReportSection>

        <S.MetaInfo>
          <S.GeneratedDate>
            Relatório gerado em: {new Date(brutalFactsReport.geradoEm).toLocaleDateString('pt-BR')} às {new Date(brutalFactsReport.geradoEm).toLocaleTimeString('pt-BR')}
          </S.GeneratedDate>
          <S.AIBadge>
            Gerado por IA
          </S.AIBadge>
        </S.MetaInfo>
      </S.ReportContent>
    </S.Container>
  );
}
