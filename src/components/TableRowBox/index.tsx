import React from "react";
import * as S from "./styles.ts";
import { MdAccountCircle, MdArrowForward } from "react-icons/md";

interface TableRowBoxProps {
  name: string;
  role: string;
  workTime?: string;
  status: "avaliado" | "andamento" | "pendente" | "Finalizado" | "Em revisão" | "Em equalização";
  onClick?: () => void;
  icon?: React.ReactNode;
}

const TableRowBox: React.FC<TableRowBoxProps> = ({
  name,
  role,
  workTime,
  status,
  onClick,
  icon = <MdAccountCircle size={64} />, // Default icon if none provided
}) => {
  return (
    <S.Container>
      <S.InfoContainer>
        {icon}
        <div>
          <S.Name>{name}</S.Name>
          <S.Role>{role}</S.Role>
          <S.WorkTime>{workTime}</S.WorkTime>
        </div>
      </S.InfoContainer>

      <S.RightContent>
        <S.StatusContainer $status={status}>
          <S.Status $status={status}>{status}</S.Status>
        </S.StatusContainer>

        <S.ArrowButton onClick={onClick}>
          <MdArrowForward size={20} />
        </S.ArrowButton>
      </S.RightContent>
    </S.Container>
  );
};

export default TableRowBox;
