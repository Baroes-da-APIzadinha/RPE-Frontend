import React from "react";
import * as S from "./styles.ts";
import { MdAccountCircle } from "react-icons/md";
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
        <MdAccountCircle size={64} />
        <div>
          <S.Name>{name}</S.Name>
          <S.Role>{role}</S.Role>
          <S.WorkTime>{workTime}</S.WorkTime>
        </div>
      </S.InfoContainer>
      <S.StatusContainer $status={status}>
        <S.Status $status={status}>{status}</S.Status>
      </S.StatusContainer>
    </S.Container>
  );
};

export default TableRowBox;
