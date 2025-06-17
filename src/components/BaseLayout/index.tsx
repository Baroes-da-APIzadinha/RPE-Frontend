import * as S from "./styles";
import type { ReactNode } from "react";
import { Sidebar } from "../Sidebar";

type Props = {
  children: ReactNode;
};

export function BaseLayout({ children }: Props) {
  return (
    <S.Wrapper>
      <Sidebar
        roles={["colaborador", "gestor", "rh", "comite"]}
        mainRole="comite"
        userName="João Gomes"
      />
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
}
