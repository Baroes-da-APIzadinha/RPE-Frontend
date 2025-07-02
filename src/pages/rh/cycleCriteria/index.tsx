import { Title } from '@/components/Title';
import { criteriosIniciais } from '@/data/crietrios';
import { cicloAtual } from '@/data/manageCycle';
import Button from '@/components/Button';
import * as S from './styles';
import { Card } from '@/components/Card';
import { ToggleBar } from '@/components/ToggleBar';
import { MdAssignment } from 'react-icons/md';
import React from 'react';
import { Checkbox } from '@/components/CheckBox';




export function CycleCriteriaPage() {

  const execucao = criteriosIniciais.filter(c => c.categoria === 'execucao');
  const comportamento = criteriosIniciais.filter(c => c.categoria === 'comportamento');
  const gestao = criteriosIniciais.filter(c => c.categoria === 'gestao');
  const ciclo = cicloAtual;
  const [tipo, setTipo] = React.useState<'execucao' | 'comportamento' | 'gestao'>('execucao');
  const [checkedCriterios, setCheckedCriterios] = React.useState<Record<string, boolean>>({});

  const categorias = [
    { value: 'execucao', label: 'Execução' },
    { value: 'comportamento', label: 'Comportamento' },
    { value: 'gestao', label: 'Gestão e Liderança' },
  ];

  const criteriosPorTipo = tipo === 'execucao' ? execucao : tipo === 'comportamento' ? comportamento : gestao;


  return (
        <>
        <header>
        <Title>Alocação de Critérios - {ciclo.nome}</Title>
        <S.Subtitle >
            <div> Status: <span className='infos'>{ciclo.status.toLocaleUpperCase()}</span> </div>
            |
            <div> Período: <span className='infos'>{ciclo.dataInicio} a {ciclo.dataFim}</span> </div>
        </S.Subtitle>
        </header>

        <Card>
          <S.Header>
                      <div>
                        <S.Title>Critérios de Avaliação</S.Title>
                        <S.CardSubtitle>
                          aloque os critérios de avaliação para o ciclo atual
                        </S.CardSubtitle>
                      </div>
                    </S.Header>
          <ToggleBar
              value={tipo}
              onChange={(value) => setTipo(value as any)}
              items={categorias.map(({ value, label }) => ({
                value,
                label,
                icon: <MdAssignment />,
              }))}
            />
              <div>
                  <S.Table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Peso</th>
                        <th>Adicionado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteriosPorTipo.map((criterio, idx) => {
                        const id = criterio.idCriterio || `${tipo}-${idx}`;
                        return (
                          <tr key={id}>
                            <td>{criterio.nome}</td>
                            <td>{criterio.descricao}</td>
                            <td>{Number(criterio.peso).toFixed(1)}</td>
                            <td>
                              <Checkbox
                                checked={!!checkedCriterios[id]}
                                onChange={() =>
                                  setCheckedCriterios((prev) => ({
                                    ...prev,
                                    [id]: !prev[id],
                                  }))
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </S.Table>
              </div>

        </Card>
      
      <Button>Salvar Alocação</Button>
    </>
  );
}

export default CycleCriteriaPage;
