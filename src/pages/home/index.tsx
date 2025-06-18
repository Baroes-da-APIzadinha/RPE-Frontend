import { BaseLayout } from '../../components/BaseLayout'
import  CardBox  from '../../components/CardBox'
import { MdOutlineInsertInvitation } from "react-icons/md";
import { MdOutlineTimelapse } from "react-icons/md";
import { MdGrade } from "react-icons/md";
import *  as S from './styles.ts'
export function Home() {
  return (
     <>
      <BaseLayout>
      <h1>Página Inicial</h1>
      <S.CardContainer>


      <CardBox
      icon={<MdOutlineInsertInvitation/>}
      title='ciclo atual'
      bigSpan='2025.1'
      span='12 dias para o fim do ciclo' 
      />
      <CardBox
      icon={<MdOutlineTimelapse/>}
      title='progresso do ciclo'
      bigSpan='40%'
      progress={40}
      />
      <CardBox
      icon={<MdGrade/>}
      title='ultima Avaliação'
      bigSpan='4.3'
      miniSpan='-0.3'
        />
      </S.CardContainer>


      
      </BaseLayout>
    </>
  )
}