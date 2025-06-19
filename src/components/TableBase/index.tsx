import React from "react";
import * as S from "./styles.ts";

export interface TableProps {
  children: React.ReactNode;
  title: String;
  subtitle?: String;
}

export const TableBase: React.FC<TableProps> = ({
  children,
  title,
  subtitle,
}) => (
  <S.StyledTableBase>
    <S.StyledTableTitle>{title}</S.StyledTableTitle>
    {subtitle && <S.StyledTableSubtitle>{subtitle}</S.StyledTableSubtitle>}
    <div style={{ display:"flex", flexDirection: "column", gap: "1rem" }}>
    {children}
    </div>
  </S.StyledTableBase>
);
