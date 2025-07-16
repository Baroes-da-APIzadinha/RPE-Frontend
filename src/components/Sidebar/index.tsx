import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
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
  MdOutlineBalance,
  MdAdminPanelSettings,
} from "react-icons/md";
import * as S from "./styles";
import { useState, type ReactNode } from "react";
import { useLogout } from "@/services/Auth/logout";
import { LuLogs } from "react-icons/lu";
import type { Role } from "@/types/PerfilData.tsx";

type SidebarProps = {
  roles: Role[]; // papéis ativos
  mainRole: Role; // título mostrado
  userName: string;
};
type NavItem = { to: string; label: string; icon: ReactNode };
export function Sidebar({ roles, mainRole, userName }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isPerfilActive = location.pathname === "/perfil";

  const allNavItems: Record<Role, NavItem[]> = {
    colaborador: [
      {
        to: "/colaborador/home",
        label: "Página Inicial",
        icon: <MdSpaceDashboard size={24} />,
      },
      {
        to: "/colaborador/evaluation",
        label: "Avaliação do ciclo",
        icon: <MdAssignmentTurnedIn size={24} />,
      },
      {
        to: "/colaborador/evolution",
        label: "Evolução",
        icon: <MdShowChart size={24} />,
      },
    ],
    rh: [
      {
        to: "/rh/dashboard",
        label: "Home",
        icon: <MdGridView size={24} />,
      },
      {
        to: "/rh/collaborators",
        label: "Colaboradores (RH)",
        icon: <MdGroup size={24} />,
      },
      {
        to: "/rh/cycle",
        label: "Gestão de Ciclos",
        icon: <MdHistory size={24} />,
      },
      {
        to: "/rh/criteria",
        label: "Critérios",
        icon: <MdChecklist size={24} />,
      },
      {
        to: "/rh/import",
        label: "Importação de dados",
        icon: <MdFileUpload size={24} />,
      },
    ],
    gestor: [
      {
        to: "/gestor/dashboard",
        label: "Dashboard (Gestor)",
        icon: <MdHome size={24} />,
      },
      {
        to: "/gestor/team",
        label: "Minha equipe",
        icon: <MdSupervisorAccount size={24} />,
      },
    ],
    comite: [
      {
        to: "/comite/equalization",
        label: "Equalização do Ciclo",
        icon: <MdOutlineBalance size={24} />,
      },
      {
        to: "/comite/history",
        label: "Histórico de ciclos",
        icon: <MdHistoryToggleOff size={24} />,
      },
    ],
    lider: [],
    mentor: [
      {
        to: "/mentor/mentorados",
        label: "Mentorados",
        icon: <MdSpaceDashboard size={24} />,
      },
    ],
    admin: [
      {
        to: "/admin/painel",
        label: "Painel Administrativo",
        icon: <MdAdminPanelSettings size={24} />,
      },
      {
        to: "/admin/auditoria",
        label: "Logs de Auditoria",
        icon: <LuLogs size={24} />,
      },
      {
        to: "/admin/auditoria-roles",
        label: "Gerenciar Perfis",
        icon: <MdSupervisorAccount size={24} />,
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
    lider: "Painel do Líder",
    mentor: "Painel do Mentor",
    admin: "Painel do Administrador",
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
                  <S.NavItem active={isActive} aria-label={label}>
                    {icon}
                    {label}
                  </S.NavItem>
                )}
              </NavLink>
            ))}
          </S.Nav>
        </S.ScrollArea>
        <S.Footer>
          <S.User
            onClick={() => navigate("/perfil")}
            aria-label="Perfil"
            data-active={isPerfilActive}
          >
            <MdAccountBox />
            {userName}
          </S.User>
          <S.Logout onClick={useLogout()} aria-label="Logout">
            <MdLogout />
            Logout
          </S.Logout>
        </S.Footer>
      </S.Container>
    </>
  );
}
