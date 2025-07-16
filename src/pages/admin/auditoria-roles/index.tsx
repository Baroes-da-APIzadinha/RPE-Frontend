import { useState } from "react";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { TableBase } from "@/components/TableBase";
import { SearchInput } from "@/components/SearchInput";
import { DropdownActions } from "@/components/DropdownActions";
import { Checkbox } from "@/components/CheckBox";
import Button from "@/components/Button";
import { MdAccountCircle, MdEdit, MdSave, MdClose } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { formatar } from "@/utils/formatters";
import { useAllUsers } from "@/hooks/useAllUsers";
import { useManageProfiles } from "@/hooks/useManageProfiles";
import type { Role } from "@/types/PerfilData";
import { toast } from "sonner";

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

interface ColaboradorData {
  id: string;
  nome: string;
  cargo: string;
  trilha: string;
  unidade: string;
  roles: Role[];
}

export function AuditoriaRolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<ColaboradorData | null>(null);
  const [rolesTemporarias, setRolesTemporarias] = useState<Role[]>([]);
  
  const { users, loading, error } = useAllUsers();
  const { manageProfiles, loading: manageLoading, error: manageError } = useManageProfiles();
  // Transformar dados da API para o formato esperado
  const colaboradores: ColaboradorData[] = users.map((user) => ({
    id: user.idColaborador,
    nome: user.nome,
    cargo: user.cargos[0] || "",
    trilha: user.trilha,
    unidade: user.unidade,
    roles: user.cargos.map(cargo => {
      // Mapear cargos para roles
      const roleMap: Record<string, Role> = {
        'COLABORADOR_COMUM': 'colaborador',
        'GESTOR': 'gestor',
        'RH': 'rh',
        'MEMBRO_COMITE': 'comite',
        'ADMIN': 'admin',
        'LIDER': 'lider',
        'MENTOR': 'mentor'
      };
      return roleMap[cargo] || 'colaborador';
    })
  }));

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

  const handleSaveRoles = async () => {
    if (colaboradorSelecionado) {
      // Mapear roles para perfis da API
      const roleToPerfilMap: Record<Role, string> = {
        'colaborador': 'COLABORADOR_COMUM',
        'gestor': 'GESTOR',
        'rh': 'RH',
        'comite': 'MEMBRO_COMITE',
        'admin': 'ADMIN',
        'lider': 'LIDER',
        'mentor': 'MENTOR'
      };

      // Perfis originais do colaborador
      const originalPerfis = colaboradorSelecionado.roles.map(role => roleToPerfilMap[role]);
      console.log('Perfis originais:', colaboradorSelecionado.id);
      // Perfis selecionados no modal
      const selectedPerfis = rolesTemporarias.map(role => roleToPerfilMap[role]);

      // Arrays para desassociar e associar
      const arrayToDisassociate = originalPerfis.filter(perfil => !selectedPerfis.includes(perfil));
      const arrayToAssociate = selectedPerfis.filter(perfil => !originalPerfis.includes(perfil));
      if (arrayToDisassociate.length === 0 && arrayToAssociate.length === 0) {
        toast.info("Nenhuma alteração detectada nos perfis.");
        handleCloseModal();
        return;
      }
      try {
        await manageProfiles(
          colaboradorSelecionado.id, 
          arrayToAssociate as any[], 
          arrayToDisassociate as any[]
        );
        toast.success("Perfis atualizados com sucesso!");
      } catch (err) {
        console.error('Erro ao atualizar perfis:', err);
        toast.error("Erro ao atualizar perfis");
      }
    }
    handleCloseModal();
    window.location.reload();
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
    const matchesSearch = `${colaborador.nome} ${colaborador.cargo} ${colaborador.trilha} ${colaborador.unidade}`
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
              placeholder="Buscar por nome, cargo, trilha ou unidade..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </S.FilterItem>
        </S.FiltersSection>

        {loading ? (
          <S.EmptyState>
            <IoPersonOutline size={48} />
            <S.EmptyTitle>Carregando colaboradores...</S.EmptyTitle>
          </S.EmptyState>
        ) : error ? (
          <S.EmptyState>
            <IoPersonOutline size={48} />
            <S.EmptyTitle>Erro ao carregar colaboradores</S.EmptyTitle>
            <S.EmptySubtitle>{error}</S.EmptySubtitle>
          </S.EmptyState>
        ) : sortedColaboradores.length === 0 ? (
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
                  <S.ColaboradorTrilha>{formatar(colaborador.trilha)} • {formatar(colaborador.unidade)}</S.ColaboradorTrilha>
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

          {manageError && (
            <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '1rem' }}>
              {manageError}
            </div>
          )}
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
            disabled={rolesTemporarias.length === 0 || manageLoading}
          >
            <MdSave style={{ marginRight: '0.5rem' }} />
            {manageLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </S.ModalActions>
      </S.StyledModal>
    </S.Container>
  );
}
