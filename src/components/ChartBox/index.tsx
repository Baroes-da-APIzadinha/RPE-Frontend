import React from 'react'
import * as S from './styles'

interface ChartBoxProps {
  title?: string
  children: React.ReactNode // Aqui você pode passar qualquer gráfico como filho
}

const ChartBox: React.FC<ChartBoxProps> = ({ title, children }) => {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}
      <S.ChartWrapper>
        {children}
      </S.ChartWrapper>
    </S.Container>
  )
}

export default ChartBox
