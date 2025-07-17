import React, { useState } from "react";
import * as S from "./styles";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast } from "sonner";
import { trocarSenhaPrimeiroLogin } from "@/services/HTTP/colaboradores";
import { useNavigate } from "react-router-dom";
import { usePerfil } from "@/hooks/usePerfil";
import logo from "@/assets/DefaultLogo.svg";

export function FirstLogin() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { perfil } = usePerfil();
  const roles: string[] = perfil?.roles || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!perfil?.userId) {
      toast.error("Erro ao identificar usuário");
      return;
    }

    if (!senhaAtual) {
      toast.error("Digite sua senha atual");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não conferem");
      return;
    }

    if (novaSenha.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await trocarSenhaPrimeiroLogin(perfil.userId, {
        senhaAtual,
        novaSenha,
      });

      toast.success("Senha alterada com sucesso!");

      const roleRoutes: Record<string, string> = {
        ADMIN: "/admin/auditoria",
        RH: "/rh/dashboard",
        LIDER: "/gestor/dashboard",
        MEMBRO_COMITE: "/comite/equalization",
        MENTOR: "/mentor/mentorados",
      };

      const destino = roles.find((role) => roleRoutes[role]) ?? "COLABORADOR";

      navigate(roleRoutes[destino] || "/colaborador/home");
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      toast.error("Erro ao trocar senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.FormContainer>
        <S.Header>
          <S.IconWrapper>
            <img src={logo} alt="Logo" width={90} height={90} />
          </S.IconWrapper>
          <div>
            <S.Title>Primeiro Acesso</S.Title>
            <S.Subtitle>Por favor, troque sua senha para continuar</S.Subtitle>
          </div>
        </S.Header>

        <S.Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Senha atual"
            label="Senha Atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Nova senha"
            label="Nova Senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirmar nova senha"
            label="Confirmar Nova Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Alterando senha..." : "Alterar Senha"}
          </Button>
        </S.Form>
      </S.FormContainer>
    </S.Container>
  );
}
