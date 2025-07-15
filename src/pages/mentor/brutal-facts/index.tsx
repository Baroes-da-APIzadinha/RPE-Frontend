import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";
import { Title } from "@/components/Title";
import Button from "@/components/Button";
import { MdAccountCircle, MdArrowBack, MdFileDownload } from "react-icons/md";
import { formatar } from "@/utils/formatters";
import { useGetBrutalFacts } from "@/hooks/IA/useGetBrutalFacts";
import { useColaboradorById } from "@/hooks/colaboradores/useColaboradorById";
import { useCicloAtual } from "@/hooks/useCicloAtual";

export function BrutalFactsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Decodificar o ID do colaborador da URL
  const colaboradorId = decodeURIComponent(id || "");
  
  // Hooks para buscar dados reais
  const { colaborador } = useColaboradorById(colaboradorId);
  const { cicloAtual } = useCicloAtual();
  const { data: brutalFacts, loading, error } = useGetBrutalFacts(
    colaboradorId,
    cicloAtual?.id || ""
  );
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleExportPDF = () => {
    // Aqui seria implementada a lógica para exportar PDF
    // Por enquanto, apenas um placeholder
    alert("Funcionalidade de exportação PDF será implementada pelo backend");
  };

  if (loading) {
    return (
      <S.Container>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Carregando brutal facts...</p>
        </div>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Erro ao carregar brutal facts: {error}</p>
        </div>
      </S.Container>
    );
  }

  if (!brutalFacts) {
    return (
      <S.Container>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Nenhum brutal facts encontrado para este colaborador.</p>
        </div>
      </S.Container>
    );
  }
  
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
              <S.MentoradoNome>{colaborador?.nomeCompleto || "Nome não disponível"}</S.MentoradoNome>
              <S.MentoradoCargo>{formatar(colaborador?.cargo || "Cargo não disponível")}</S.MentoradoCargo>
              <S.MentoradoUnidade>{formatar(colaborador?.unidade || "Unidade não disponível")}</S.MentoradoUnidade>
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
            <p>{brutalFacts.mensagemColaborador || "Resumo não disponível"}</p>
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Nota Final Equalizada</S.SectionTitle>
          <S.HighlightBox>
            <S.SectionContent>
              <p>{brutalFacts.notaFinalEqualizada || "Nota final não disponível"}</p>
            </S.SectionContent>
          </S.HighlightBox>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Justificativa do Comitê</S.SectionTitle>
          <S.SectionContent>
            <p>{brutalFacts.justificativaComite || "Justificativa não disponível"}</p>
          </S.SectionContent>
        </S.ReportSection>
        <S.ReportSection>
          <S.SectionTitle>Pontos Fortes</S.SectionTitle>
          <S.SectionContent>
            {brutalFacts.pontosFortes.length > 0 ? (
              <ul>
                {brutalFacts.pontosFortes.map((ponto: string, index: number) => (
                  <li key={index}>{ponto}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum ponto forte identificado</p>
            )}
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Áreas de Desenvolvimento</S.SectionTitle>
          <S.SectionContent>
            {brutalFacts.oportunidadesMelhoria.length > 0 ? (
              <ul>
                {brutalFacts.oportunidadesMelhoria.map((area: string, index: number) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma oportunidade de melhoria identificada</p>
            )}
          </S.SectionContent>
        </S.ReportSection>

        <S.ReportSection>
          <S.SectionTitle>Recomendações</S.SectionTitle>
          <S.SectionContent>
            {brutalFacts.recomendacoesComite.length > 0 ? (
              <ul>
                {brutalFacts.recomendacoesComite.map((recomendacao: string, index: number) => (
                  <li key={index}>{recomendacao}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma recomendação disponível</p>
            )}
          </S.SectionContent>
        </S.ReportSection>



       
        <S.MetaInfo>
          <S.GeneratedDate>
            Relatório gerado em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
          </S.GeneratedDate>
          <S.AIBadge>
            Gerado por IA
          </S.AIBadge>
        </S.MetaInfo>
      </S.ReportContent>
    </S.Container>
  );
}
