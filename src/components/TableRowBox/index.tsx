import React from "react";
import * as S from "./styles.ts";

interface TableRowBoxProps {
  name: string;
  role: string;
  workTime: string;
  status: "avaliado" | "andamento" | "pendente";
}

const TableRowBox: React.FC<TableRowBoxProps> = ({
  name,
  role,
  workTime,
  status,
}) => {
  return (
    <S.Container>
      <S.InfoContainer>
        <S.Name>{name}</S.Name>
        <S.Role>{role}</S.Role>
        <S.WorkTime>{workTime}</S.WorkTime>
      </S.InfoContainer>
      <S.StatusContainer $status={status}>
        <S.Status>{status}</S.Status>
      </S.StatusContainer>
    </S.Container>
  );
};

export default TableRowBox;
