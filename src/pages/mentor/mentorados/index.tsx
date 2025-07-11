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

// Mock data para mentorados
const mentoradosMock = [
  {
    id: "1",
    nome: "Ana Silva Costa",
    cargo: "Desenvolvedor Frontend Junior",
    unidade: "Tecnologia",
    desempenho: 4.2,
    dataInicio: "2024-01-15",
    ultimaAvaliacao: "2024-06-15"
  },
  {
    id: "2", 
    nome: "Pedro Santos Oliveira",
    cargo: "Analista de QA",
    unidade: "Tecnologia",
    desempenho: 3.8,
    dataInicio: "2024-02-01",
    ultimaAvaliacao: "2024-06-10"
  },
  {
    id: "3",
    nome: "Carla Mendes",
    cargo: "Desenvolvedor Backend Pleno",
    unidade: "Tecnologia", 
    desempenho: 4.5,
    dataInicio: "2023-11-20",
    ultimaAvaliacao: "2024-06-20"
  },
  {
    id: "4",
    nome: "Lucas Fernando",
    cargo: "Product Owner Junior",
    unidade: "Produto",
    desempenho: 3.9,
    dataInicio: "2024-03-10",
    ultimaAvaliacao: "2024-06-05"
  },
  {
    id: "5",
    nome: "Mariana Souza",
    cargo: "UX Designer",
    unidade: "Design",
    desempenho: 4.1,
    dataInicio: "2024-01-08",
    ultimaAvaliacao: "2024-06-12"
  }
];

export function MentoradosPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const sortedMentorados = [...mentoradosMock].sort((a, b) => b.desempenho - a.desempenho);

  const filteredMentorados = sortedMentorados.filter((mentorado) => {
    const matchesSearch = `${mentorado.nome} ${mentorado.cargo}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getDesempenhoColor = (desempenho: number) => {
    if (desempenho >= 4.0) return "success";
    if (desempenho >= 3.5) return "warning";
    return "error";
  };

  const handleBrutalFacts = (mentoradoId: string) => {
    navigate(`/mentor/brutal-facts/${encodeURIComponent(mentoradoId)}`);
  };

  const handleViewProfile = (mentoradoId: string) => {
    navigate(`/mentor/mentorado-profile/${encodeURIComponent(mentoradoId)}`);
  };

  const getActionOptions = (mentorado: any) => [
    {
      label: "Ver Perfil",
      icon: <IoPersonOutline />,
      onClick: () => handleViewProfile(mentorado.id)
    },
    {
      label: "Brutal Facts",
      icon: <MdMoreVert />,
      onClick: () => handleBrutalFacts(mentorado.id)
    }
  ];

  return (
    <S.Container>
      <S.Header>
        <Title>Meus Mentorados</Title>
        <S.StatsContainer>
          <S.StatCard>
            <S.StatNumber>{mentoradosMock.length}</S.StatNumber>
            <S.StatLabel>Total de Mentorados</S.StatLabel>
          </S.StatCard>
          <S.StatCard>
            <S.StatNumber>{mentoradosMock.filter(m => m.desempenho >= 4.0).length}</S.StatNumber>
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
                : "Você ainda não possui mentorados ativos"
              }
            </S.EmptySubtitle>
          </S.EmptyState>
        ) : (
          filteredMentorados.map((mentorado) => (
            <S.MentoradoRow key={mentorado.id}>
              <S.MentoradoInfo>
                <S.Avatar>
                  <MdAccountCircle size={48} />
                </S.Avatar>
                <S.MentoradoDetails>
                  <S.MentoradoNome>{mentorado.nome}</S.MentoradoNome>
                  <S.MentoradoCargo>{formatar(mentorado.cargo)}</S.MentoradoCargo>
                  <S.MentoradoUnidade>{formatar(mentorado.unidade)}</S.MentoradoUnidade>
                </S.MentoradoDetails>
              </S.MentoradoInfo>
              
              <S.DesempenhoSection>
                <S.DesempenhoLabel>Desempenho</S.DesempenhoLabel>
                <S.DesempenhoValue $color={getDesempenhoColor(mentorado.desempenho)}>
                  {mentorado.desempenho.toFixed(1)}
                </S.DesempenhoValue>
              </S.DesempenhoSection>

              <S.StatusSection>
               
                <S.UltimaAvaliacao>
                  Última avaliação: {new Date(mentorado.ultimaAvaliacao).toLocaleDateString('pt-BR')}
                </S.UltimaAvaliacao>
              </S.StatusSection>

              <S.ActionsSection>
                <DropdownActions
                  actions={getActionOptions(mentorado)}
                  orientation="vertical"
                />
              </S.ActionsSection>
            </S.MentoradoRow>
          ))
        )}
      </TableBase>
    </S.Container>
  );
}
