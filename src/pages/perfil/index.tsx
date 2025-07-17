import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Card } from "@/components/Card";
import Input from "@/components/Input";
import { Select } from "@/components/Select";
import Button from "@/components/Button";
import { toast } from "sonner";
import { useColaboradorById } from "@/hooks/colaboradores/useColaboradorById";
import { useColaboradorConstantes } from "@/hooks/colaboradores/useColaboradorConstantes";
import { usePerfil } from "@/hooks/usePerfil";
import { atualizarColaborador } from "@/services/HTTP/colaboradores";
import { Title } from "@/components/Title";
import { formatar } from "@/utils/formatters";

interface FormData {
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cargo: string;
  trilhaCarreira: string;
  unidade: string;
}

const PerfilPage: React.FC = () => {
  const { perfil } = usePerfil();
  const { colaborador, loading } = useColaboradorById(perfil?.userId ?? "");
  const { constantes } = useColaboradorConstantes();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cargo: "",
    trilhaCarreira: "",
    unidade: "",
  });

  const [errors, setErrors] = useState({
    senha: false,
    confirmarSenha: false,
  });

  useEffect(() => {
    if (colaborador) {
      setFormData((prev) => ({
        ...prev,
        nomeCompleto: colaborador.nomeCompleto || "",
        email: colaborador.email || "",
        cargo: colaborador.cargo || "",
        trilhaCarreira: colaborador.trilhaCarreira || "",
        unidade: colaborador.unidade || "",
        senha: "",
        confirmarSenha: "",
      }));
    }
  }, [colaborador]);

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSelectChange =
    (field: keyof FormData) => (value: string | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const validateForm = () => {
    const newErrors = {
      senha: false,
      confirmarSenha: false,
    };

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      newErrors.senha = true;
      newErrors.confirmarSenha = true;
      toast.error("As senhas não conferem");
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  function getOnlyModifiedFields(
    original: Partial<FormData>,
    updated: FormData
  ): Partial<FormData> {
    const changedFields: Partial<FormData> = {};

    for (const key in updated) {
      if (key === "confirmarSenha") continue; // não é necessário enviar

      const typedKey = key as keyof FormData;
      if (updated[typedKey] !== original[typedKey]) {
        changedFields[typedKey] = updated[typedKey];
      }
    }

    return changedFields;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !perfil?.userId) return;

    try {
      setSubmitting(true);
      const originalData = {
        nomeCompleto: colaborador?.nomeCompleto || "",
        email: colaborador?.email || "",
        cargo: colaborador?.cargo || "",
        trilhaCarreira: colaborador?.trilhaCarreira || "",
        unidade: colaborador?.unidade || "",
        senha: "",
      };

      const updateData = getOnlyModifiedFields(originalData, formData);

      await atualizarColaborador(perfil.userId, updateData);
      setFormData((prev) => ({
        ...prev,
        senha: "",
        confirmarSenha: "",
      }));

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <S.Header>
        <Title>Meu Perfil</Title>
      </S.Header>

      <Card>
        <form onSubmit={handleSubmit}>
          <S.FormWrapper>
            <S.FormRow>
              <S.FormBlock>
                <S.Label>Nome Completo</S.Label>
                <Input
                  value={formData.nomeCompleto}
                  onChange={handleInputChange("nomeCompleto")}
                  placeholder="Digite seu nome completo"
                />
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>E-mail</S.Label>
                <Input
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="Digite seu e-mail"
                />
              </S.FormBlock>
            </S.FormRow>

            <S.FormRow>
              <S.FormBlock>
                <S.Label>Nova Senha</S.Label>
                <Input
                  type="password"
                  value={formData.senha}
                  onChange={handleInputChange("senha")}
                  placeholder="Digite sua nova senha"
                  error={errors.senha}
                />
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>Confirmar Nova Senha</S.Label>
                <Input
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange("confirmarSenha")}
                  placeholder="Confirme sua nova senha"
                  error={errors.confirmarSenha}
                />
              </S.FormBlock>
            </S.FormRow>

            <S.FormRow>
              <S.FormBlock>
                <S.Label>Cargo</S.Label>
                <Select
                  value={formData.cargo}
                  onChange={(value) =>
                    handleSelectChange("cargo")(value as string)
                  }
                  options={
                    constantes?.cargos.map((cargo) => ({
                      value: cargo,
                      label: formatar(cargo),
                    })) ?? []
                  }
                  placeholder="Selecione seu cargo"
                />
              </S.FormBlock>
              <S.FormBlock>
                <S.Label>Trilha de Carreira</S.Label>
                <Select
                  value={formData.trilhaCarreira}
                  onChange={(value) =>
                    handleSelectChange("trilhaCarreira")(value as string)
                  }
                  options={
                    constantes?.trilhas.map((trilha) => ({
                      value: trilha,
                      label: formatar(trilha),
                    })) ?? []
                  }
                  placeholder="Selecione sua trilha"
                />
              </S.FormBlock>
            </S.FormRow>

            <S.FormRow>
              <S.FormBlock>
                <S.Label>Unidade</S.Label>
                <Select
                  value={formData.unidade}
                  onChange={(value) =>
                    handleSelectChange("unidade")(value as string)
                  }
                  options={
                    constantes?.unidades.map((unidade) => ({
                      value: unidade,
                      label: formatar(unidade),
                    })) ?? []
                  }
                  placeholder="Selecione sua unidade"
                />
              </S.FormBlock>
            </S.FormRow>

            <S.ButtonContainer>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </S.ButtonContainer>
          </S.FormWrapper>
        </form>
      </Card>
    </>
  );
};

export default PerfilPage;
