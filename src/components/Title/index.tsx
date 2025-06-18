import * as S from './styles.ts'

interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return <S.Title>{children}</S.Title>;
}