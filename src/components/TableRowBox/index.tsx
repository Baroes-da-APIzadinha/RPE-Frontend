import React from "react";
import * as S from "./styles.ts";
import { MdAccountCircle, MdArrowForward } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

export interface TableRowBoxProps {
  name: string;
  role: string;
  workTime?: string;
  status:
    | "Avaliado"
    | "Andamento"
    | "Pendente"
    | "Finalizado"
    | "Em revisão"
    | "Em equalização"
    | "Fechado";
  onClick?: () => void;
  icon?: React.ReactNode;
}

const TableRowBox: React.FC<TableRowBoxProps> = ({
  name,
  role,
  workTime,
  status,
  onClick,
  icon = (
    <S.Avatar>
      <IoMdPerson size={32} />
    </S.Avatar>
  ),
}) => {
  return (
    <S.Container>
      <S.InfoContainer>
        {icon}
        <S.TextContainer>
          <S.Name>{name}</S.Name>
          <S.Role>{role}</S.Role>
          <S.WorkTime>{workTime}</S.WorkTime>
        </S.TextContainer>
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
