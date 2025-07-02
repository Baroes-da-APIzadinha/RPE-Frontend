import * as S from "./styles.ts";
import { Title } from "@/components/Title/index.tsx";
import Button from "@/components/Button/index.tsx";
import { CollaboratorRow } from "@/components/CollaboratorRow/index.tsx";
import { Modal } from "@/components/Modal/index.tsx";
import { useState } from "react";
import Input from "@/components/Input";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/CheckBox/index.tsx";
import { MdOutlinePersonAdd } from "react-icons/md";
import { SearchInput } from "@/components/SearchInput";
import { toast } from "sonner";
import { useCreateColaborador } from "@/hooks/colaboradores/useColaborador.ts";
import { useListColaboradores } from "@/hooks/colaboradores/useListColaboradores.ts";
import { useColaboradorConstantes } from "@/hooks/colaboradores/useColaboradorConstantes.ts";

export function RhCollaborator() {
  const { create, loading: creating } = useCreateColaborador();
  const {
    colaboradores,
    loading: loadingList,
    refetch,
  } = useListColaboradores();
  const { constantes, loading: loadingConstantes } = useColaboradorConstantes();

  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState<string | null>(null);
  const [trilha, setTrilha] = useState<string | null>(null);
  const [unidade, setUnidade] = useState<string | null>(null);
  const [tiposUsuario, setTiposUsuario] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: false,
    cargo: false,
    email: false,
    trilha: false,
    unidade: false,
    tiposUsuario: false,
  });

  const tiposDeUsuario = [
    { value: "COLABORADOR_COMUM", label: "Colaborador" },
    { value: "GESTOR", label: "Gestor" },
    { value: "RH", label: "RH" },
    { value: "MEMBRO_COMITE", label: "Comitê" },
    { value: "ADMIN", label: "Admin" },
  ];

  const trilhas =
    constantes?.trilhas.map((value) => ({
      value,
      label: formatar(value),
    })) || [];

  const cargos =
    constantes?.cargos.map((value) => ({
      value,
      label: formatar(value),
    })) || [];

  const unidades =
    constantes?.unidades.map((value) => ({
      value,
      label: formatar(value),
    })) || [];

  function formatar(str: string) {
    return str
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  const handleSubmit = async () => {
    const newErrors = {
      name: !name,
      email: !email,
      cargo: !cargo,
      trilha: !trilha,
      unidade: !unidade,
      tiposUsuario: tiposUsuario.length === 0,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await create({
        nomeCompleto: name,
        email,
        senha: "senha123",
        cargo: cargo!,
        trilhaCarreira: trilha!,
        unidade: unidade!,
        tiposPerfil: tiposUsuario,
      });

      toast.success("Colaborador criado com sucesso!");
      await refetch();
      resetForm();
      setShowModal(false);

      resetForm();
      setShowModal(false);
    } catch {
      toast.error("Erro ao criar colaborador.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCargo(null);
    setTrilha(null);
    setUnidade(null);
    setTiposUsuario([]);
  };

  return (
    <>
      <>
        <S.Header>
          <Title>Gerenciar Colaboradores</Title>
          <S.HeaderButtons>
            <Button onClick={() => setShowModal(true)}>
              <MdOutlinePersonAdd size={24} />
              Adicionar Colaborador
            </Button>
          </S.HeaderButtons>
        </S.Header>

        <S.CardContainer>
          <S.TableContainer>
            <S.FiltersRow>
              <div>
                <S.Title>Colaboradores</S.Title>
                <S.Subtitle>Gerencie os usuários do sistema RPE</S.Subtitle>
              </div>
              <S.Actions>
                <SearchInput
                  placeholder="Buscar Colaboradores..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </S.Actions>
            </S.FiltersRow>

            <S.Table>
              <thead>
                <tr>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                  <th>Trilha</th>
                  <th>Unidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {colaboradores
                  .filter(
                    (c) =>
                      c.nomeCompleto
                        .toLowerCase()
                        .includes(busca.toLowerCase()) ||
                      c.email.toLowerCase().includes(busca.toLowerCase()) ||
                      c.cargo.toLowerCase().includes(busca.toLowerCase()) ||
                      c.trilhaCarreira
                        .toLowerCase()
                        .includes(busca.toLowerCase()) ||
                      c.unidade.toLowerCase().includes(busca.toLowerCase())
                  )
                  .map((c) => (
                    <CollaboratorRow
                      key={c.id}
                      name={c.nomeCompleto}
                      email={c.email}
                      role={formatar(c.cargo)}
                      track={formatar(c.trilhaCarreira)}
                      unit={formatar(c.unidade)}

                      // userType={c.perfis?.join(", ") || ""}
                    />
                  ))}
              </tbody>
            </S.Table>
          </S.TableContainer>
        </S.CardContainer>
      </>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Adicionar Colaborador"
        description="Preencha os dados do novo colaborador"
      >
        <S.ModalContent>
          <div>
            <S.ModalText>Nome Completo:*</S.ModalText>
            <Input
              placeholder="Digite o nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
          </div>
          <S.ModalRow>
            <S.ModalDiv>
              <S.ModalText>Cargo:*</S.ModalText>
              <Select
                placeholder="Selecione o cargo"
                value={cargo}
                onChange={setCargo}
                options={cargos}
                error={errors.cargo}
              />
            </S.ModalDiv>

            <S.ModalDiv>
              <S.ModalText>Email:*</S.ModalText>
              <Input
                placeholder="email@rocketcorp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </S.ModalDiv>
          </S.ModalRow>
          <S.ModalRow>
            <S.ModalDiv>
              <S.ModalText>Trilha:*</S.ModalText>
              <Select
                placeholder="Selecione a trilha"
                value={trilha}
                onChange={setTrilha}
                options={trilhas}
                error={errors.trilha}
              />
            </S.ModalDiv>
            <S.ModalDiv>
              <S.ModalText>Unidade:</S.ModalText>
              <Select
                placeholder="Selecione a Unidade"
                value={unidade}
                onChange={setUnidade}
                options={unidades}
                error={errors.unidade}
              />
            </S.ModalDiv>
          </S.ModalRow>
          <div>
            <S.ModalText>Tipo de Usuário:*</S.ModalText>
            <S.ModalSubText>
              Selecione pelo menos um tipo de usuário.
            </S.ModalSubText>
            <S.ModalCheckbox>
              {tiposDeUsuario.map((tipo) => (
                <Checkbox
                  key={tipo.value}
                  label={tipo.label}
                  checked={tiposUsuario.includes(tipo.value)}
                  onChange={() => {
                    if (tiposUsuario.includes(tipo.value)) {
                      setTiposUsuario(
                        tiposUsuario.filter((t) => t !== tipo.value)
                      );
                    } else {
                      setTiposUsuario([...tiposUsuario, tipo.value]);
                    }
                  }}
                />
              ))}
            </S.ModalCheckbox>
          </div>
          <S.ModalButtons>
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Adicionar</Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </>
  );
}
