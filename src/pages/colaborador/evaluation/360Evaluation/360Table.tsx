import React from 'react';
import {TableBase} from '../../../../components/TableBase';
import TableRowBox from '../../../../components/TableRowBox';

const mockData = [
  { id: 1, name: 'João Silva', role: 'Desenvolvedor', workTime: '2 anos', status: 'avaliado' as 'avaliado' },
  { id: 2, name: 'Maria Oliveira', role: 'Analista', workTime: '1 ano', status: 'andamento' as 'andamento' },
  { id: 3, name: 'Carlos Santos', role: 'Gestor', workTime: '3 anos', status: 'pendente' as 'pendente' },
];

const Table360: React.FC = () => {
  return (
    <TableBase title='Colaboradores para avaliar' subtitle='Selecione os colaboradores abaixo para iniciar a avaliação'>
      {mockData.map((colaborador) => (
        <TableRowBox
          key={colaborador.id}
          name={colaborador.name}
          role={colaborador.role}
          workTime={colaborador.workTime}
          status={colaborador.status}
        />
      ))}
    </TableBase>
  );
};

export default Table360;