import React from "react";
import * as S from "./styles.ts";

export interface StatusItem {
  value: "Em andamento" | "Concluida" | "Pendente";
  label: string; // nome da avaliação
  concluidas?: number; // para avaliações 360
  total?: number; // para avaliações 360
}

interface StatusRowBoxProps {
  title: string;
  subtitle?: string;
  items: StatusItem[];
}

const StatusRowBox: React.FC<StatusRowBoxProps> = ({ title, subtitle, items }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      <S.StatusRow>
        {items.map((item, idx) => {
          let label = `${item.label} ${item.value.toLocaleLowerCase()}`;
          if (item.label.includes("360") && item.concluidas !== undefined && item.total !== undefined) {
            label += ` (${item.concluidas}/${item.total})`;
          }
          return (
            <S.StatusSpan key={idx} $status={item.value}>
              <S.Circle $status={item.value} />
              <span>{label}</span>
            </S.StatusSpan>
          );
        })}
      </S.StatusRow>
    </S.Container>
  );
};

export default StatusRowBox;
