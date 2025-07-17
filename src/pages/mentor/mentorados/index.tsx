import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { TableBase } from "@/components/TableBase";
import { SearchInput } from "@/components/SearchInput";
import { DropdownActions } from "@/components/DropdownActions";
import { MdAccountCircle, MdMoreVert } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { formatar } from "@/utils/formatters";
import { useMentorados } from "@/hooks/mentor/useMentorados";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { usePerfil } from "@/hooks/usePerfil";
import { IoMdPerson } from "react-icons/io";

export function MentoradosPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Hooks para buscar dados reais
  const { perfil } = usePerfil();
  const { cicloAtual } = useCicloAtual();
  const {
    data: mentorados,
    loading,
    error,
  } = useMentorados(perfil?.userId || "", cicloAtual?.id || "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Função para determinar o status baseado na média final
  const getStatusInfo = (mediaFinal: number | null) => {
    if (mediaFinal === null) {
      return { label: "Pendente", color: "neutral" as const };
    }

    if (mediaFinal < 2) {
      return { label: "Atenção", color: "error" as const };
    }
    if (mediaFinal >= 2.1 && mediaFinal <= 3.9) {
      return { label: "Atenção", color: "warning" as const };
    }
    if (mediaFinal >= 4) {
      return { label: "OK", color: "success" as const };
    }

    return { label: "Pendente", color: "neutral" as const };
  };

  const sortedMentorados = mentorados
    ? [...mentorados].sort((a, b) => {
        const mediaA = a.mediaFinal || 0;
        const mediaB = b.mediaFinal || 0;
        return mediaB - mediaA;
      })
    : [];

  const filteredMentorados = sortedMentorados.filter((mentorado) => {
    const matchesSearch =
      `${mentorado.nomeMentorado} ${mentorado.cargoMentorado}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <S.Container>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Carregando mentorados...</p>
        </div>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Erro ao carregar mentorados: {error}</p>
        </div>
      </S.Container>
    );
  }

  const handleBrutalFacts = (mentoradoId: string) => {
    navigate(`/mentor/brutal-facts/${encodeURIComponent(mentoradoId)}`);
  };

  const handleViewProfile = (idMentorado: string, nomeMentorado: string) => {
    navigate("/mentor/mentorado/evolução", {
      state: {
        idColaborador: idMentorado,
        nome: nomeMentorado,
      },
    });
  };

  const getActionOptions = (mentorado: any) => [
    {
      label: "Ver Evolução",
      icon: <IoPersonOutline />,
      onClick: () =>
        handleViewProfile(mentorado.idMentorado, mentorado.nomeMentorado),
    },
    {
      label: "Brutal Facts",
      icon: <MdMoreVert />,
      onClick: () => handleBrutalFacts(mentorado.idMentorado),
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <Title>Meus Mentorados</Title>
        <S.StatsContainer>
          <S.StatCard>
            <S.StatNumber>{mentorados?.length || 0}</S.StatNumber>
            <S.StatLabel>Total de Mentorados</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatNumber>
              {mentorados?.filter((m) => (m.mediaFinal || 0) >= 4.0).length ||
                0}
            </S.StatNumber>
            <S.StatLabel>Alto Desempenho</S.StatLabel>
          </S.StatCard>
        </S.StatsContainer>
      </S.Header>

      <Card>
        <S.FiltersSection>
          <S.FilterItem>
            <label>Buscar mentorado</label>
            <SearchInput
              placeholder="Buscar por nome ou cargo..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </S.FilterItem>
        </S.FiltersSection>
      </Card>

      <TableBase
        title="Lista de Mentorados"
        subtitle={`${filteredMentorados.length} mentorados encontrados`}
      >
        {filteredMentorados.length === 0 ? (
          <S.EmptyState>
            <IoPersonOutline size={48} />
            <S.EmptyTitle>Nenhum mentorado encontrado</S.EmptyTitle>
            <S.EmptySubtitle>
              {searchTerm
                ? "Tente ajustar os filtros de busca"
                : "Você ainda não possui mentorados ativos"}
            </S.EmptySubtitle>
          </S.EmptyState>
        ) : (
          filteredMentorados.map((mentorado) => {
            const statusInfo = getStatusInfo(mentorado.mediaFinal);

            return (
              <S.MentoradoRow key={mentorado.idMentorado}>
                <S.MentoradoInfo>
                  <S.Avatar>
                    <IoMdPerson size={32} />
                  </S.Avatar>
                  <S.MentoradoDetails>
                    <S.MentoradoNome>{mentorado.nomeMentorado}</S.MentoradoNome>
                    <S.MentoradoCargo>
                      {formatar(mentorado.cargoMentorado)}
                    </S.MentoradoCargo>
                    <S.MentoradoUnidade>
                      {formatar(mentorado.trilhaMentorado)}
                    </S.MentoradoUnidade>
                  </S.MentoradoDetails>
                </S.MentoradoInfo>

                <S.DesempenhoSection>
                  <S.DesempenhoLabel>Média Final</S.DesempenhoLabel>
                  <S.DesempenhoValue $color={statusInfo.color}>
                    {mentorado.mediaFinal || "N/A"}
                  </S.DesempenhoValue>
                </S.DesempenhoSection>

                <S.StatusSection>
                  <S.UltimaAvaliacao>
                    Status:{" "}
                    <S.StatusBadge $color={statusInfo.color}>
                      {statusInfo.label}
                    </S.StatusBadge>
                  </S.UltimaAvaliacao>
                </S.StatusSection>

                <S.ActionsSection>
                  <DropdownActions
                    actions={getActionOptions(mentorado)}
                    orientation="vertical"
                  />
                </S.ActionsSection>
              </S.MentoradoRow>
            );
          })
        )}
      </TableBase>
    </S.Container>
  );
}
