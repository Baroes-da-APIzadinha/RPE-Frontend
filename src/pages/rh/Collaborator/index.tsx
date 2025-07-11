import * as S from "./styles.ts";
import { Title } from "@/components/Title/index.tsx";
import { useState } from "react";
import {
  MdAccountCircle,
  MdApartment,
  MdInsertDriveFile,
} from "react-icons/md";
import { SearchInput } from "@/components/SearchInput";
import { useListColaboradores } from "@/hooks/colaboradores/useListColaboradores.ts";
import { formatar } from "@/utils/formatters.ts";

export function RhCollaborator() {
  const { colaboradores, loading: loadingList } = useListColaboradores();
  const [busca, setBusca] = useState("");
  const searchTerm = busca.toLowerCase();

  if (loadingList) return <div>Carregando...</div>;

  return (
    <>
      <>
        <S.Header>
          <Title>Gerenciar Colaboradores</Title>
        </S.Header>

        <S.CardContainer>
          <S.TableContainer>
            <S.FiltersRow>
              <div>
                <S.Title>Colaboradores</S.Title>
                <S.Subtitle>Gerencie os usuários do sistema RPE</S.Subtitle>
              </div>
              <S.Actions>
                <SearchInput
                  placeholder="Buscar Colaboradores..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </S.Actions>
            </S.FiltersRow>

            <S.Table>
              <thead>
                <tr>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                  <th>Trilha</th>
                  <th>Unidade</th>
                </tr>
              </thead>
              <tbody>
                {colaboradores
                  .filter((c) =>
                    [
                      c.nomeCompleto,
                      c.email,
                      c.cargo,
                      c.trilhaCarreira,
                      c.unidade,
                    ].some((field) => field.toLowerCase().includes(searchTerm))
                  )
                  .map((c) => (
                    <S.Row key={c.id}>
                      <S.Colaborador>
                        <MdAccountCircle size={64} />
                        <S.Info>
                          <p>{c.nomeCompleto}</p>
                          <span>{c.email}</span>
                        </S.Info>
                      </S.Colaborador>
                      <td>{formatar(c.cargo)}</td>
                      <td>
                        <S.Track>
                          <MdInsertDriveFile size={24} />
                          {formatar(c.trilhaCarreira)}
                        </S.Track>
                      </td>
                      <td>
                        <S.Unit>
                          <MdApartment size={24} />
                          {formatar(c.unidade)}
                        </S.Unit>
                      </td>
                    </S.Row>
                  ))}
              </tbody>
            </S.Table>
          </S.TableContainer>
        </S.CardContainer>
      </>
    </>
  );
}
