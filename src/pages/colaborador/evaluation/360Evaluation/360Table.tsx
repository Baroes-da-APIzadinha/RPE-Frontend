import React from "react";
import { TableBase } from "../../../../components/TableBase";
import TableRowBox from "../../../../components/TableRowBox";
import { mockColaboradores } from "@/data/colaboradores360";
import { useAvaliacoes360 } from "@/hooks/Avaliacoes360";

interface Table360Props {
  onSelect: (id: number) => void;
}

const Table360: React.FC<Table360Props> = ({ onSelect }) => {
  const { getStatus } = useAvaliacoes360();

  return (
    <TableBase title='Colaboradores para avaliar' subtitle='Selecione os colaboradores abaixo para iniciar a avaliação'>
      {mockColaboradores.map((colaborador) => (
        <TableRowBox
          key={colaborador.id}
          name={colaborador.name}
          role={colaborador.role}
          workTime={colaborador.workTime}
          status={getStatus(colaborador.id)}
          onClick={() => onSelect(colaborador.id)}
        />
      ))}
    </TableBase>
  );
};


export default Table360;
