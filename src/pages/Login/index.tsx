import React, { useState } from "react";
import * as S from "./styles.ts";
import Input from "@/components/Input";
import Button from "@/components/Button/index.tsx";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "@/services/Auth/login.ts";
import { getPerfil } from "@/services/HTTP/perfil";
import { getColaboradorById } from "@/services/HTTP/colaboradores";
import { toast } from "sonner";
import logo from "@/assets/DefaultLogo.svg"; 
import textTitle from "@/assets/DefaultTitle.svg"; 


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
      const colaborador = await getColaboradorById(res.userId);

      if (colaborador.primeiroLogin) {
        toast.success(
          "Login realizado com sucesso! Por favor, altere sua senha."
        );
        navigate("/primeiro-login");
        return;
      }

      let destination = "/colaborador/home";

      if (roles.includes("RH")) {
        destination = "/rh/dashboard";
      } else if (roles.includes("LIDER")) {
        destination = "/gestor/dashboard";
      } else if (roles.includes("MEMBRO_COMITE")) {
        destination = "/comite/equalization";
      } else if (roles.includes("ADMIN")) {
        destination = "/admin/auditoria";
      } else if (roles.includes("MENTOR")) {
        destination = "/mentor/mentorados";
      }

      toast.success("Login realizado com sucesso!");
      navigate(destination);
    } catch (error) {
      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.Header>
          <S.IconWrapper>
            <img src={logo} alt="Logo" width={90} height={90} />
          </S.IconWrapper>
          <div>
            <img src={textTitle} alt="Rocket Corp" width={350} height={90} />
            {/* <S.Title>RPE</S.Title> */}
            {/* <S.Subtitle>Rocket Performance &amp; Engagement</S.Subtitle> */}
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
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </S.Form>
    </S.Container>
  );
}
