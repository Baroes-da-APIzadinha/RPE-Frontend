import * as S from "./styles";

type ImportItem = {
  arquivo: string;
  tipo: string;
  data: string;
  status: "Sucesso" | "Erro" | "Em Andamento";
  registros: number;
  erros: number;
};


type Props = {
  data: ImportItem[];
};

export function CardImportHistory({ data }: Props) {
  return (
    <S.Container>
      <S.Header>
        <h2>Histórico de Importações</h2>
        <span>Últimas importações realizadas no sistema</span>
      </S.Header>

      <S.Table>
        <thead>
          <tr>
            <th>Arquivo</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Status</th>
            <th>Registros</th>
            <th>Erros</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.arquivo}</td>
              <td>{item.tipo}</td>
              <td>{item.data}</td>
              <td>
                <S.Status status={item.status}>{item.status}</S.Status>
              </td>
              <td>{item.registros}</td>
              <td>
                <S.Erros valor={item.erros}>{item.erros}</S.Erros>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
}
