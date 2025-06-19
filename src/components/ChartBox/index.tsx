import React from 'react'
import * as S from './styles'

interface ChartBoxProps {
  title?: string
  subtitle?: string
  children: React.ReactNode // Aqui você pode passar qualquer gráfico como filho
}

const ChartBox: React.FC<ChartBoxProps> = ({ title, subtitle, children }) => {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}
      {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
      <S.ChartWrapper>
        {children}
      </S.ChartWrapper>
    </S.Container>
  )
}

export default ChartBox
