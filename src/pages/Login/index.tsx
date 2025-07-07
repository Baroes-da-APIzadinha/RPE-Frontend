import React, { useState } from "react";
import * as S from "./styles.ts";
import { MdRocketLaunch } from "react-icons/md";
import Input from "@/components/Input";
import Button from "@/components/Button/index.tsx";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "@/services/Auth/login.ts";
import { getPerfil } from "@/services/HTTP/perfil";
import { toast } from "sonner"; 

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleLogin(email, password);

      const res = await getPerfil();
      const roles: string[] = res.roles || [];

      let destination = "/colaborador/home";

      if (roles.includes("ADMIN") || roles.includes("RH")) {
        destination = "/rh/dashboard";
      } else if (roles.includes("GESTOR")) {
        destination = "/gestor/dashboard";
      } else if (roles.includes("COMITE")) {
        destination = "/comite/historico";
      }
      toast.success("Login realizado com sucesso!");
      navigate(destination);
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
    }
  };

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
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Digite seu email"
          label="Email"
        />
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Digite sua senha"
          label="Senha"
        />
        <Button variant="default">Entrar</Button>
      </S.Form>
    </S.Container>
  );
}
