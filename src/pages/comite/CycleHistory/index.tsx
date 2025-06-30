import * as S from "./styles.ts";
import { Sidebar } from "@/components/Sidebar/index.tsx";
import { Title } from "./styles.ts";
import { Card } from "@/components/Card/index.tsx";
import Button from "@/components/Button";
import { MdFileDownload } from "react-icons/md";
import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal/index.tsx";
import { LuTriangleAlert } from "react-icons/lu";
import { getCiclos } from "@/services/HTTP/ciclos";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import theme from "@/styles/theme";
import { SearchInput } from "@/components/SearchInput/index.tsx";
import { Select } from "@/components/Select/index.tsx";
import { usePerfil } from "@/hooks/usePerfil.ts";

type Ciclo = {
  id: string;
  nome: string;
  cor: string;
  data: string;
  status: string;
};

export function CycleHistory() {
  const { perfil, loading } = usePerfil();


  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const { cicloAtual } = useCicloAtual();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const fetchedCiclos = await getCiclos();
        const adaptedCiclos: Ciclo[] = fetchedCiclos.map((ciclo: any) => ({
          id: ciclo.idCiclo,
          nome: ciclo.nomeCiclo,
          cor:
            ciclo.status === "AGENDADO"
              ? theme.colors.text.primary
              : ciclo.status === "FECHADO"
              ? theme.colors.info.default
              : theme.colors.secondary.default,
          data:
            ciclo.status === "AGENDADO"
              ? `Início em ${new Date(ciclo.dataInicio).toLocaleDateString()}`
              : `Fim em ${new Date(ciclo.dataFim).toLocaleDateString()}`,
          status: ciclo.status,
        }));

        const uniqueCiclos = adaptedCiclos.filter(
          (ciclo) => !cicloAtual || ciclo.nome !== cicloAtual.nome
        );

        setCiclos(uniqueCiclos);
      } catch (error) {
        console.error("Error fetching ciclos:", error);
      }
    };

    fetchCiclos();
  }, [cicloAtual]);

  const cicloPassaFiltro = (ciclo: Ciclo) => {
    const nomeMatch = ciclo.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "todos" || ciclo.status === statusFilter;
    return nomeMatch && statusMatch;
  };

  const filteredCiclos = ciclos.filter(cicloPassaFiltro);

  if (loading || !perfil) return null;


  return (
    <S.Wrapper>
      <Sidebar
        roles={perfil.roles}
        mainRole={perfil.mainRole}
        userName={perfil.userName}
      />
      <S.Main>
        <S.Header>
          <Title>Histórico de Avaliações</Title>
        </S.Header>

        <Card>
          <S.Title>Filtros</S.Title>
          <S.FiltersWrapper>
            <S.FilterItem>
              <label>Buscar por ciclo</label>
              <SearchInput
                placeholder="Buscar ciclo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </S.FilterItem>

            <S.FilterItem>
              <label>Status da equalização</label>
              <Select
                placeholder="Todos os status"
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                options={[
                  { label: "Todos", value: "todos" },
                  { label: "Agendado", value: "AGENDADO" },
                  { label: "Andamento", value: "EM_ANDAMENTO" },
                  { label: "Fechado", value: "FECHADO" },
                ]}
              />
            </S.FilterItem>
          </S.FiltersWrapper>
        </Card>

        <Card>
          {cicloAtual &&
            cicloPassaFiltro({
              id: cicloAtual.id,
              nome: cicloAtual.nome,
              cor: theme.colors.secondary.default,
              data: cicloAtual.tempoRestante,
              status: "EM_ANDAMENTO",
            }) && (
              <S.CycleCard key={cicloAtual.id}>
                <S.CycleInfo>
                  <S.CycleAvatar
                    style={{ backgroundColor: theme.colors.warning }}
                  />
                  <div>
                    <strong>{cicloAtual.nome}</strong>
                    <p>{cicloAtual.tempoRestante}</p>
                  </div>
                </S.CycleInfo>

                <S.CycleActions>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedCycle(cicloAtual.nome);
                      setShowExportModal(true);
                    }}
                  >
                    <MdFileDownload /> Exportar
                  </Button>
                  <S.StatusTag $status="em andamento">em andamento</S.StatusTag>
                </S.CycleActions>
              </S.CycleCard>
            )}

          {filteredCiclos.map((ciclo) => (
            <S.CycleCard key={ciclo.id}>
              <S.CycleInfo>
                <S.CycleAvatar style={{ backgroundColor: ciclo.cor }} />
                <div>
                  <strong>{ciclo.nome}</strong>
                  <p>{ciclo.data}</p>
                </div>
              </S.CycleInfo>

              <S.CycleActions>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log(`Exportando ciclo ${ciclo.nome}...`);
                  }}
                  disabled={ciclo.status === "AGENDADO"}
                >
                  <MdFileDownload /> Exportar
                </Button>

                <S.StatusTag
                  $status={ciclo.status}
                  style={{
                    color:
                      ciclo.status === "AGENDADO"
                        ? theme.colors.text.iconMuted
                        : ciclo.status === "FECHADO"
                        ? theme.colors.info.text
                        : theme.colors.warning,
                    borderColor:
                      ciclo.status === "AGENDADO"
                        ? theme.colors.text.iconMuted
                        : ciclo.status === "FECHADO"
                        ? theme.colors.info.text
                        : theme.colors.warning,
                    backgroundColor:
                      ciclo.status === "AGENDADO"
                        ? theme.colors.lightGray
                        : ciclo.status === "FECHADO"
                        ? theme.colors.info.light
                        : theme.colors.warning,
                  }}
                >
                  {ciclo.status}
                </S.StatusTag>
              </S.CycleActions>
            </S.CycleCard>
          ))}
        </Card>
      </S.Main>
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Ciclo de Avaliação Incompleto"
        icon={<LuTriangleAlert />}
        iconColor="warning"
      >
        <S.ModalContent>
          <S.ModalDiv>
            <S.Subtitle>
              O ciclo de avaliação atual ainda não foi finalizado. Os dados
              podem estar incompletos ou conter informações provisórias.
            </S.Subtitle>

            <S.ModalAlert>Deseja exportar os dados mesmo assim?</S.ModalAlert>
          </S.ModalDiv>
          <S.ModalButtons>
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                console.log(
                  `Exportando ciclo ${selectedCycle} mesmo incompleto...`
                );
                setShowExportModal(false);
              }}
            >
              <MdFileDownload /> Exportar Mesmo Assim
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </S.Wrapper>
  );
}
