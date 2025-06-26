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
  MdClose,
  MdMenu,
} from "react-icons/md";
import * as S from "./styles";
import { useState } from "react";
import { useLogout } from "@/services/Auth/logout";

type Role = "colaborador" | "rh" | "gestor" | "comite";

type SidebarProps = {
  roles: Role[]; // papéis ativos
  mainRole: Role; // título mostrado
  userName: string;
};

export function Sidebar({ roles, mainRole, userName }: SidebarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const allNavItems = {
    colaborador: [
      {
        to: "/colaborador/home",
        label: "Página Inicial",
        icon: <MdSpaceDashboard />,
      },
      {
        to: "/colaborador/evaluation",
        label: "Avaliação do ciclo",
        icon: <MdAssignmentTurnedIn />,
      },
      {
        to: "/colaborador/evolution",
        label: "Evolução",
        icon: <MdShowChart />,
      },
    ],
    rh: [
      { to: "/rh/dashboard", label: "Dashboard (RH)", icon: <MdGridView /> },
      {
        to: "/rh/collaborators",
        label: "Colaboradores (RH)",
        icon: <MdGroup />,
      },
      { to: "/rh/criteria", label: "Critérios", icon: <MdChecklist /> },
      {
        to: "/rh/import",
        label: "Importação de dados",
        icon: <MdFileUpload />,
      },
    ],
    gestor: [
      {
        to: "/gestor/dashboard",
        label: "Dashboard (Gestor)",
        icon: <MdHome />,
      },
      {
        to: "/gestor/team",
        label: "Minha equipe",
        icon: <MdSupervisorAccount />,
      },
    ],
    comite: [
      {
        to: "/comite/history",
        label: "Histórico de ciclos",
        icon: <MdHistoryToggleOff />,
      },
    ],
  };

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



  return (
    <>
      {!open && (
        <S.MenuButtonOutside onClick={() => setOpen(true)}>
          <MdMenu size={28} />
        </S.MenuButtonOutside>
      )}
      <S.Container $open={open}>
        {open && (
          <S.MenuButtonInside onClick={() => setOpen(false)}>
            <MdClose size={28} />
          </S.MenuButtonInside>
        )}

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
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
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
          <S.Logout onClick={useLogout()}>
            <MdLogout />
            Logout
          </S.Logout>
        </S.Footer>
      </S.Container>
    </>
  );
}
