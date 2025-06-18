import React from 'react'
import * as S from './styles'
import { MdOutlineTrendingUp, MdOutlineTrendingDown, MdOutlineTrendingFlat } from 'react-icons/md'

interface CardBoxProps {
  title: string
  bigSpan: string 
  progress?: number // 0-100, se definido mostra barra de progresso
  span?: string
  miniSpan?: string
  miniSpanIcon?: React.ReactNode // Novo: ícone opcional para o minispan
  icon?: React.ReactNode // Novo: ícone opcional
}

type MiniSpanStatus = 'default' | 'positive' | 'negative' | 'neutral';

const getMiniSpanStatus = (miniSpan?: string): { color: MiniSpanStatus, icon: React.ReactNode } => {
  const value = Number(miniSpan)
  if (isNaN(value)) return { color: 'default', icon: null }
  if (value > 0) return { color: 'positive', icon: <MdOutlineTrendingUp /> }
  if (value < 0) return { color: 'negative', icon: <MdOutlineTrendingDown /> }
  return { color: 'neutral', icon: <MdOutlineTrendingFlat /> }
}

const CardBox: React.FC<CardBoxProps> = ({ title, bigSpan, progress, span, miniSpan, icon }) => {
  const { color, icon: miniIcon } = getMiniSpanStatus(miniSpan)

  return (
    <S.Container>
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.Title>{title}</S.Title>
      <S.BigSpan>{bigSpan}</S.BigSpan>
      {typeof progress === 'number' && (
        <S.ProgressBar>
          <S.Progress percent={progress} />
        </S.ProgressBar>
      )}
      {span && <S.Span>{span}</S.Span>}
      {miniSpan && (
        <S.MiniSpan $status={color}>
          {miniIcon}
          {miniSpan}
        </S.MiniSpan>
      )}
    </S.Container>
  )
}

export default CardBox
