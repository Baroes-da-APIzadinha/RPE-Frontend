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

export function RhCollaborator() {
  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [trilha, setTrilha] = useState<string | null>(null);
  const [unidade, setUnidade] = useState<string | null>(null);
  const [gestor, setGestor] = useState<string | null>(null);
  const [tiposUsuario, setTiposUsuario] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: false,
    cargo: false,
    email: false,
    trilha: false,
    unidade: false,
    gestor: false,
    tiposUsuario: false,
  });

  const [colaboradores, setColaboradores] = useState([
    {
      name: "João Silva",
      email: "joao.silva@rocketcorp.com",
      role: "Desenvolvedor Senior",
      track: "Tecnologia",
      unit: "São Paulo",
      manager: "Maria Oliveira",
      userType: "colaborador",
    },
    {
      name: "Gustavo Silva",
      email: "gustavo.silva@rocketcorp.com",
      role: "Analista de Produto",
      track: "Produto",
      unit: "Remoto",
      manager: "Lucas Menezes",
      userType: "rh",
    },
    {
      name: "Aline Barbosa",
      email: "aline.barbosa@rocketcorp.com",
      role: "Engenheira de Dados",
      track: "Dados",
      unit: "Belo Horizonte",
      manager: "João Gomes",
      userType: "comite",
    },
  ]);

  const gestores = [
    { value: "maria_oliveira", label: "Maria Oliveira" },
    { value: "carlos_santos", label: "Carlos Santos" },
    { value: "fernanda_lima", label: "Fernanda Lima" },
    { value: "joao_gomes", label: "João Gomes" },
    { value: "paula_braga", label: "Paula Braga" },
    { value: "carla_souza", label: "Carla Souza" },
    { value: "lucas_menezes", label: "Lucas Menezes" },
  ];

  const tiposDeUsuario = [
    { value: "colaborador", label: "Colaborador" },
    { value: "gestor", label: "Gestor" },
    { value: "rh", label: "RH" },
    { value: "comite", label: "Comitê" },
  ];

  const trilhas = [
    { value: "tecnologia", label: "Tecnologia" },
    { value: "produto", label: "Produto" },
    { value: "design", label: "Design" },
    { value: "gestao", label: "Gestão" },
    { value: "dados", label: "Dados" },
  ];

  const unidades = [
    { value: "sao_paulo", label: "São Paulo" },
    { value: "rio_de_janeiro", label: "Rio de Janeiro" },
    { value: "recife", label: "Recife" },
    { value: "belo_horizonte", label: "Belo Horizonte" },
    { value: "remoto", label: "Remoto" },
  ];

  const handleSubmit = () => {
    const newErrors = {
      name: !name,
      cargo: !cargo,
      email: !email,
      trilha: !trilha,
      unidade: !unidade,
      gestor: !gestor,
      tiposUsuario: tiposUsuario.length === 0,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const novoColaborador = {
      name,
      email,
      role: cargo,
      track: trilha,
      unit: unidade,
      manager: gestores.find((g) => g.value === gestor)?.label || gestor,
      userType: null,
    };

    setColaboradores((prev) => [...prev, novoColaborador]);
    toast.success("Colaborador adicionado com sucesso!");

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCargo("");
    setTrilha(null);
    setUnidade(null);
    setGestor(null);
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

                {/* <Button variant="outline">
                  <MdFileDownload /> Exportar
                </Button>
                <Button variant="outline">
                  <MdFileUpload /> Importar
                </Button> */}
              </S.Actions>
            </S.FiltersRow>

            <S.Table>
              <thead>
                <tr>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                  <th>Trilha</th>
                  <th>Unidade</th>
                  <th>Gestor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {colaboradores
                  .filter(
                    (c) =>
                      c.name.toLowerCase().includes(busca.toLowerCase()) ||
                      c.email.toLowerCase().includes(busca.toLowerCase()) ||
                      c.role.toLowerCase().includes(busca.toLowerCase()) ||
                      c.track.toLowerCase().includes(busca.toLowerCase()) ||
                      c.unit.toLowerCase().includes(busca.toLowerCase()) ||
                      c.manager.toLowerCase().includes(busca.toLowerCase())
                  )
                  .map((c) => (
                    <CollaboratorRow key={c.email} {...c} />
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
              <Input
                placeholder="Digite o cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
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
          <S.ModalRow>
            <S.ModalDiv>
              <S.ModalText>Gestor:*</S.ModalText>
              <Select
                placeholder="Selecione o gestor"
                value={gestor}
                onChange={setGestor}
                options={gestores}
                error={errors.gestor}
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
