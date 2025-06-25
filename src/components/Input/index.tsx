import React from 'react'
import * as S from './styles.ts'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ label, error, id, placeholder, ...props }) => (
  <S.Wrapper>
    {label && <S.Label htmlFor={id}>{label}</S.Label>}
    <S.Input id={id} placeholder={placeholder} error={error} {...props} />
  </S.Wrapper>
)

export default Input
