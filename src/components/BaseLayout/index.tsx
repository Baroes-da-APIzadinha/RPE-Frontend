import * as S from "./styles";
import { Sidebar } from "../Sidebar";
import { usePerfil } from "@/hooks/usePerfil";
import { LoadingScreen } from "@/pages/LoadinScreen";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
  const { perfil, loading } = usePerfil();

  if (loading || !perfil) return <LoadingScreen />;

  return (
    <S.Wrapper>
      <Sidebar
        roles={perfil.roles}
        mainRole={perfil.mainRole}
        userName={perfil.userName}
      />
      <S.Main>
        <Outlet  context={{ perfil }} />
      </S.Main>
    </S.Wrapper>
  );
}
