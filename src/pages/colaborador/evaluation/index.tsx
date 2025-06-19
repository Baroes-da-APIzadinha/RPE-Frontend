import * as S from "./styles";
import EvaluationFrame from "@/components/EvaluationFrame";
import  CriteryBox  from "@/components/CriteryBox";
export function ColaboradorEvaluation() {
  return (
    <S.Wrapper>
      <S.Main>
        <EvaluationFrame title="Comportamento">
         <CriteryBox
          title="Sentimento de Dono"
          subtitle="Demonstrou responsabilidade e comprometimento com os resultados" 
          
          />
           <CriteryBox
          title="Sentimento de Dono"
          subtitle="Demonstrou responsabilidade e comprometimento com os resultados" 
          
          />
           <CriteryBox
          title="Sentimento de Dono"
          subtitle="Demonstrou responsabilidade e comprometimento com os resultados" 
          
          />
        </EvaluationFrame>
      </S.Main>
    </S.Wrapper>
  );
}

export default ColaboradorEvaluation;
