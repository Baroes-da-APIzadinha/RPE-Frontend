import React, { useState } from 'react'
import * as S from './styles.ts'
import Button from '../../components/Button/index.tsx'
import { MdRocketLaunch } from "react-icons/md";
import Input from '../../components/Input'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de autenticação aqui
    alert(`Email: ${email}\nSenha: ${password}`)
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.Header>
          <S.IconWrapper>
            <MdRocketLaunch size={48} />
          </S.IconWrapper>
          <div>
            <S.Title>RPE</S.Title>
            <S.Subtitle>Rocket Performance &amp; Engagement</S.Subtitle>
          </div>
        </S.Header>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Digite seu email"
          label="Email"
        />
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Digite sua senha"
          label="Senha"
        />
        <Button
        variant="default">
          Entrar
        </Button>        
      </S.Form>
    </S.Container>
  )
}

export default Login
