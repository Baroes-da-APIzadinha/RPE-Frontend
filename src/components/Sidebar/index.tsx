import { useLocation, NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboardCustomize,
  MdAssignment,
  MdTrendingUp,
  MdGroups,
  MdChecklist,
  MdFileUpload,
  MdHistory,
  MdAccountBox,
  MdLogout,
  MdAssignmentTurnedIn,
  MdGridView,
  MdGroup,
  MdHistoryToggleOff,
  MdHome,
  MdShowChart,
  MdSpaceDashboard,
  MdSupervisorAccount,
} from "react-icons/md";
import * as S from "./styles";

type Role = "colaborador" | "rh" | "gestor" | "comite";

type SidebarProps = {
  roles: Role[]; // papéis ativos
  mainRole: Role; // título mostrado
  userName: string;
};

export function Sidebar({ roles, mainRole, userName }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const allNavItems = {
  colaborador: [
    { to: '/home', label: 'Página Inicial', icon: <MdSpaceDashboard /> },
    { to: '/avaliacao', label: 'Avaliação do ciclo', icon: <MdAssignmentTurnedIn /> },
    { to: '/evolucao', label: 'Evolução', icon: <MdShowChart /> }
  ],
  rh: [
    { to: '/rh/dashboard', label: 'Dashboard (RH)', icon: <MdGridView /> },
    { to: '/rh/colaboradores', label: 'Colaboradores (RH)', icon: <MdGroup /> },
    { to: '/rh/criterios', label: 'Critérios', icon: <MdChecklist /> },
    { to: '/rh/import', label: 'Importação de dados', icon: <MdFileUpload /> }
  ],
  gestor: [
    { to: '/gestor/home', label: 'Dashboard (Gestor)', icon: <MdHome /> },
    { to: '/gestor/colaboradores', label: 'Colaboradores (Gestor)', icon: <MdSupervisorAccount /> }
  ],
  comite: [
    { to: '/historico', label: 'Histórico de ciclos', icon: <MdHistoryToggleOff /> }
  ]
}

  const combinedNavItems = Array.from(
    new Map(
      roles.flatMap((role) => allNavItems[role]).map((item) => [item.to, item])
    ).values()
  );

  const roleLabels = {
    colaborador: "Portal do Colaborador",
    rh: "Painel do RH",
    gestor: "Painel do Gestor",
    comite: "Painel do Comitê",
  };

  const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};

  return (
    <S.Container>
        <S.Header>
          <S.Logo />
          <div>
            <S.Title>RPE</S.Title>
            <S.Subtitle>{roleLabels[mainRole]}</S.Subtitle>
          </div>
        </S.Header>

      <S.ScrollArea>
        <S.Nav>
          {combinedNavItems.map(({ to, label, icon }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <S.NavItem active={isActive}>
                  {icon}
                  {label}
                </S.NavItem>
              )}
            </NavLink>
          ))}
        </S.Nav>
      </S.ScrollArea>

      <S.Footer>
        <S.User>
          <MdAccountBox />
          {userName}
        </S.User>
        <S.Logout onClick={handleLogout}>
          <MdLogout />
          Logout
        </S.Logout>
      </S.Footer>
    </S.Container>
  );
}
