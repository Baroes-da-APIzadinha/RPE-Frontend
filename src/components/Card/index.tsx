import * as S from "./styles";

type Props = {
  children: React.ReactNode;
};

export function Card({ children }: Props) {
  return <S.CardContainer>{children}</S.CardContainer>;
}
