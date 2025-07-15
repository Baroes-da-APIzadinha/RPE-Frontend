import { useState } from "react";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { TableBase } from "@/components/TableBase";
import { SearchInput } from "@/components/SearchInput";
import { DropdownActions } from "@/components/DropdownActions";
import { Modal } from "@/components/Modal";
import { Checkbox } from "@/components/CheckBox";
import Button from "@/components/Button";
import { MdAccountCircle, MdEdit, MdSave, MdClose } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { formatar } from "@/utils/formatters";

// Mock data para colaboradores
const colaboradoresMock = [
  {
    id: "1",
    nome: "Ana Silva Costa",
    cargo: "DESENVOLVEDOR",
    trilha: "DESENVOLVIMENTO",
    roles: ["colaborador" as Role, "mentor" as Role]
  },
  {
    id: "2",
    nome: "Pedro Santos Oliveira",
    cargo: "ANALISTA_QA",
    trilha: "QA",
    roles: ["colaborador" as Role]
  },
  {
    id: "3",
    nome: "Carla Mendes",
    cargo: "TECH_LEAD",
    trilha: "DESENVOLVIMENTO",
    roles: ["colaborador" as Role, "lider" as Role]
  },
  {
    id: "4",
    nome: "Lucas Fernando",
    cargo: "PRODUCT_OWNER",
    trilha: "PRODUTO",
    roles: ["colaborador" as Role, "gestor" as Role]
  },
  {
    id: "5",
    nome: "Mariana Souza",
    cargo: "UX_DESIGNER",
    trilha: "DESIGN",
    roles: ["colaborador" as Role]
  },
  {
    id: "6",
    nome: "João Santos",
    cargo: "ANALISTA_RH",
    trilha: "RH",
    roles: ["colaborador" as Role, "rh" as Role]
  },
  {
    id: "7",
    nome: "Maria Oliveira",
    cargo: "GERENTE_PROJETOS",
    trilha: "GESTAO",
    roles: ["colaborador" as Role, "gestor" as Role, "comite" as Role]
  },
  {
    id: "8",
    nome: "Roberto Lima",
    cargo: "ADMINISTRADOR",
    trilha: "INFRAESTRUTURA",
    roles: ["colaborador" as Role, "admin" as Role]
  }
];

// Roles disponíveis do sistema
const rolesDisponiveis = [
  { value: "colaborador", label: "Colaborador" },
  { value: "rh", label: "RH" },
  { value: "gestor", label: "Gestor" },
  { value: "comite", label: "Comitê" },
  { value: "lider", label: "Líder" },
  { value: "mentor", label: "Mentor" },
  { value: "admin", label: "Admin" }
];

type Role = "colaborador" | "rh" | "gestor" | "comite" | "lider" | "mentor" | "admin";

interface ColaboradorData {
  id: string;
  nome: string;
  cargo: string;
  trilha: string;
  roles: Role[];
}

export function AuditoriaRolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<ColaboradorData | null>(null);
  const [rolesTemporarias, setRolesTemporarias] = useState<Role[]>([]);
  const [colaboradores, setColaboradores] = useState<ColaboradorData[]>(colaboradoresMock);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditProfile = (colaborador: ColaboradorData) => {
    setColaboradorSelecionado(colaborador);
    setRolesTemporarias([...colaborador.roles]);
    setModalOpen(true);
  };

  const handleRoleChange = (role: Role, checked: boolean) => {
    if (checked) {
      setRolesTemporarias(prev => [...prev, role]);
    } else {
      setRolesTemporarias(prev => prev.filter(r => r !== role));
    }
  };

  const handleSaveRoles = () => {
    if (colaboradorSelecionado) {
      setColaboradores(prev => 
        prev.map(colab => 
          colab.id === colaboradorSelecionado.id 
            ? { ...colab, roles: rolesTemporarias }
            : colab
        )
      );
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setColaboradorSelecionado(null);
    setRolesTemporarias([]);
  };

  const getActionOptions = (colaborador: ColaboradorData) => [
    {
      label: "Editar Perfil",
      icon: <MdEdit />,
      onClick: () => handleEditProfile(colaborador)
    }
  ];

  const filteredColaboradores = colaboradores.filter((colaborador) => {
    const matchesSearch = `${colaborador.nome} ${colaborador.cargo} ${colaborador.trilha}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedColaboradores = [...filteredColaboradores].sort((a, b) => 
    a.nome.localeCompare(b.nome)
  );

  return (
    <S.Container>
      <S.Header>
        <Title>Gerência de Auditoria e Roles</Title>
       
      </S.Header>

      <TableBase
        title="Lista de Colaboradores"
        subtitle={`${sortedColaboradores.length} colaboradores encontrados`}
      >
        <S.FiltersSection>
          <S.FilterItem>
            <label>Buscar colaborador</label>
            <SearchInput
              placeholder="Buscar por nome, cargo ou trilha..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </S.FilterItem>
        </S.FiltersSection>

        {sortedColaboradores.length === 0 ? (
          <S.EmptyState>
            <IoPersonOutline size={48} />
            <S.EmptyTitle>Nenhum colaborador encontrado</S.EmptyTitle>
            <S.EmptySubtitle>
              Tente ajustar os filtros de busca
            </S.EmptySubtitle>
          </S.EmptyState>
        ) : (
          sortedColaboradores.map((colaborador) => (
            <S.ColaboradorRow key={colaborador.id}>
              <S.ColaboradorInfo>
                <S.Avatar>
                  <MdAccountCircle size={48} />
                </S.Avatar>
                <S.ColaboradorDetails>
                  <S.ColaboradorNome>{colaborador.nome}</S.ColaboradorNome>
                  <S.ColaboradorCargo>{formatar(colaborador.cargo)}</S.ColaboradorCargo>
                  <S.ColaboradorTrilha>{formatar(colaborador.trilha)}</S.ColaboradorTrilha>
                </S.ColaboradorDetails>
              </S.ColaboradorInfo>

              <S.RolesSection>
                <S.RolesLabel>Perfis Ativos</S.RolesLabel>
                <S.RolesContainer>
                  {colaborador.roles.map((role) => (
                    <S.RoleBadge key={role} $role={role}>
                      {rolesDisponiveis.find(r => r.value === role)?.label || role}
                    </S.RoleBadge>
                  ))}
                </S.RolesContainer>
              </S.RolesSection>

              <S.ActionsSection>
                <DropdownActions
                  actions={getActionOptions(colaborador)}
                  orientation="vertical"
                />
              </S.ActionsSection>
            </S.ColaboradorRow>
          ))
        )}
      </TableBase>

      {/* Modal para edição de roles */}
      <S.StyledModal
        open={modalOpen}
        onClose={handleCloseModal}
        title="Editar Perfil do Colaborador"
        description="Selecione os perfis que deseja atribuir ao colaborador."
        icon={<MdEdit />}
        iconSize="large"
      >
        <S.ModalContent>
          {colaboradorSelecionado && (
            <S.ModalHeader>
              <S.Avatar>
                <MdAccountCircle size={56} />
              </S.Avatar>
              <S.ModalColaboradorInfo>
                <S.ModalColaboradorNome>{colaboradorSelecionado.nome}</S.ModalColaboradorNome>
                <S.ModalColaboradorCargo>{formatar(colaboradorSelecionado.cargo)}</S.ModalColaboradorCargo>
              </S.ModalColaboradorInfo>
            </S.ModalHeader>
          )}

          <S.RolesGrid>
            <S.RolesTitle>Perfis Disponíveis</S.RolesTitle>

            <section className="roles-grid">
            <S.RoleCheckboxItem key="todos">
              <Checkbox
                checked={rolesTemporarias.length === rolesDisponiveis.length}
                onChange={() => {
                  const allRoles = rolesDisponiveis.map(role => role.value as Role);
                  if (rolesTemporarias.length === rolesDisponiveis.length) {
                    setRolesTemporarias([]);
                  } else {
                    setRolesTemporarias(allRoles);
                  }
                }}
              />
              <S.RoleLabel>Todos</S.RoleLabel>
            </S.RoleCheckboxItem>

            {rolesDisponiveis.map((role) => (
              <S.RoleCheckboxItem key={role.value}>
                <Checkbox
                  checked={rolesTemporarias.includes(role.value as Role)}
                  onChange={() => handleRoleChange(role.value as Role, !rolesTemporarias.includes(role.value as Role))}
                />
                <S.RoleLabel>
                  {role.label}
                </S.RoleLabel>
              </S.RoleCheckboxItem>
            ))}
            </section>

          </S.RolesGrid>

          <S.SelectedRolesPreview>
            <S.PreviewTitle>Perfis Selecionados:</S.PreviewTitle>
            <S.PreviewRoles>
              {rolesTemporarias.length > 0 ? (
                rolesTemporarias.map((role) => (
                  <S.PreviewRoleBadge key={role} $role={role}>
                    {rolesDisponiveis.find(r => r.value === role)?.label || role}
                  </S.PreviewRoleBadge>
                ))
              ) : (
                <S.NoRolesText>Nenhum perfil selecionado</S.NoRolesText>
              )}
            </S.PreviewRoles>
          </S.SelectedRolesPreview>
        </S.ModalContent>
        
        <S.ModalActions>
          <Button 
            variant="outline" 
            onClick={handleCloseModal}
          >
            <MdClose style={{ marginRight: '0.5rem' }} />
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSaveRoles}
            disabled={rolesTemporarias.length === 0}
          >
            <MdSave style={{ marginRight: '0.5rem' }} />
            Salvar Alterações
          </Button>
        </S.ModalActions>
      </S.StyledModal>
    </S.Container>
  );
}
