import React from 'react'
import StyledCardContainer from './styles.ts'


const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledCardContainer>
    {children}
  </StyledCardContainer>
)

export default CardContainer
