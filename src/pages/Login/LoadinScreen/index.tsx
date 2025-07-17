import * as S from "./styles";

export function LoadingScreen() {
  return (
    <S.Container>
      <S.Spinner />
      <S.Text>Carregando...</S.Text>
    </S.Container>
  );
}
