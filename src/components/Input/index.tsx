import React from 'react'
import * as S from './styles.ts'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input: React.FC<InputProps> = ({ label, id, placeholder, ...props }) => (
  <S.Wrapper>
    {label && <S.Label htmlFor={id}>{label}</S.Label>}
    <S.Input id={id} placeholder={placeholder} {...props} />
  </S.Wrapper>
)

export default Input
