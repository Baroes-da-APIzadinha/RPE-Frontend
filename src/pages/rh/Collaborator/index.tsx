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
import { Card } from "@/components/Card/index.tsx";
import { IoMdPerson } from "react-icons/io";

export function RhCollaborator() {
  const { colaboradores, loading: loadingList } = useListColaboradores();
  const [busca, setBusca] = useState("");
  const searchTerm = busca.toLowerCase();

  const colaboradoresFiltrados = colaboradores.filter((c) =>
    [c.nomeCompleto, c.email, c.cargo, c.trilhaCarreira, c.unidade].some(
      (field) => field.toLowerCase().includes(searchTerm)
    )
  );

  if (loadingList) return <div>Carregando...</div>;

  return (
    <>
      <S.Header>
        <Title>Gerenciar Colaboradores</Title>
      </S.Header>

      <Card>
        <S.FiltersSection>
          <S.FilterItem>
            <label>Buscar Colaborador</label>
            <SearchInput
              placeholder="Buscar Colaboradores..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </S.FilterItem>
        </S.FiltersSection>
      </Card>

      <Card>
        <S.FiltersRow>
          <div>
            <S.Title>Colaboradores</S.Title>
            <S.Subtitle>
              {colaboradoresFiltrados.length} colaboradores encontrados
            </S.Subtitle>
          </div>
        </S.FiltersRow>

        <S.Grid>
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
              <S.UserCard key={c.id}>
                <S.UserHeader>
                  <S.Avatar>
                    <IoMdPerson size={32} />
                  </S.Avatar>
                  <S.UserInfo>
                    <strong>{c.nomeCompleto}</strong>
                    <span>{c.email}</span>
                  </S.UserInfo>
                </S.UserHeader>

                <S.UserDetail>
                  <span>Cargo:</span>
                  <p>{formatar(c.cargo)}</p>
                </S.UserDetail>

                <S.UserDetail>
                  <span>Trilha:</span>
                  <p>
                    <MdInsertDriveFile size={18} />
                    {formatar(c.trilhaCarreira)}
                  </p>
                </S.UserDetail>

                <S.UserDetail>
                  <span>Unidade:</span>
                  <p>
                    <MdApartment size={18} />
                    {formatar(c.unidade)}
                  </p>
                </S.UserDetail>
              </S.UserCard>
            ))}
        </S.Grid>
      </Card>
    </>
  );
}
