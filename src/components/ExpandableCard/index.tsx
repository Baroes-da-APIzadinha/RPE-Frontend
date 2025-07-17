import * as S from './styles.ts'
import { MdArrowDropDown } from "react-icons/md";
import type { ReactNode } from "react";

interface ExpandableCardProps {
  header: ReactNode;
  children: ReactNode;
  expanded: boolean;
  onToggle: () => void;
  withBorderTop?: boolean;
}

export function ExpandableCard({
  header,
  children,
  expanded,
  onToggle,
  withBorderTop = true,
}: ExpandableCardProps) {
  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.HeaderContent>{header}</S.HeaderContent>
        <S.DropButton onClick={onToggle}>
          <MdArrowDropDown
            size={36}
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </S.DropButton>
      </S.HeaderWrapper>
      {expanded && (
        <S.Body $withBorderTop={withBorderTop}>
          {children}
        </S.Body>
      )}
    </S.Container>
  );
}

