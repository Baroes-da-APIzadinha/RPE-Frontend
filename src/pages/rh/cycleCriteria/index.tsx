import { Title } from "@/components/Title";
import { criteriosIniciais } from "@/data/crietrios";
import { cicloAtual } from "@/data/manageCycle";
import Button from "@/components/Button";
import * as S from "./styles";
import { Card } from "@/components/Card";
import { ToggleBar } from "@/components/ToggleBar";
import { MdAssignment } from "react-icons/md";
import React, { useState } from "react";
import { ExpandableCard } from "@/components/ExpandableCard";
import { Select } from "@/components/Select";
import { useColaboradorConstantes } from "@/hooks/colaboradores/useColaboradorConstantes";
import ButtonFrame from "@/components/ButtonFrame";

export function CycleCriteriaPage() {
  const execucao = criteriosIniciais.filter((c) => c.categoria === "execucao");
  const comportamento = criteriosIniciais.filter(
    (c) => c.categoria === "comportamento"
  );
  const gestao = criteriosIniciais.filter((c) => c.categoria === "gestao");
  const ciclo = cicloAtual;
  const [tipo, setTipo] = React.useState<
    "execucao" | "comportamento" | "gestao"
  >("execucao");
  const [checkedCriterios, setCheckedCriterios] = React.useState<
    Record<string, boolean>
  >({});

  const [criteriosSelecionados, setCriteriosSelecionados] = useState<
    Record<
      string,
      {
        trilhas: string[];
        unidades: string[];
      }
    >
  >({});

  const categorias = [
    { value: "execucao", label: "Execução" },
    { value: "comportamento", label: "Comportamento" },
    { value: "gestao", label: "Gestão e Liderança" },
  ];

  function updateTrilhas(id: string, values: string[]) {
    setCriteriosSelecionados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        trilhas: values.includes("ALL") ? ["ALL"] : values,
      },
    }));
  }

  function updateUnidades(id: string, values: string[]) {
    setCriteriosSelecionados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        unidades: values.includes("ALL") ? ["ALL"] : values,
      },
    }));
  }

  const criteriosPorTipo =
    tipo === "execucao"
      ? execucao
      : tipo === "comportamento"
      ? comportamento
      : gestao;

  const { constantes, loading: loadingConstantes } = useColaboradorConstantes();

  const trilhas =
    constantes?.trilhas.map((value) => ({
      value,
      label: formatar(value),
    })) || [];

  const unidades =
    constantes?.unidades.map((value) => ({
      value,
      label: formatar(value),
    })) || [];

  const trilhasOptions = [{ value: "ALL", label: "Todas" }, ...trilhas];

  const unidadesOptions = [{ value: "ALL", label: "Todas" }, ...unidades];

  function formatar(str: string) {
    if (!str) return "";

    const SIGLAS = ["QA", "RH", "UX"];
    const NOMES_CORRIGIDOS: Record<string, string> = {
      "sao paulo": "São Paulo",
      florianopolis: "Florianópolis",
      recife: "Recife",
      "rio de janeiro": "Rio de Janeiro",
    };

    const texto = str
      .toLowerCase()
      .replace(/_/g, " ")
      .split(" ")
      .map((palavra) => {
        const upper = palavra.toUpperCase();
        if (SIGLAS.includes(upper)) return upper;

        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
      })
      .join(" ");

    const chave = texto.toLowerCase();
    return NOMES_CORRIGIDOS[chave] || texto;
  }

  if (loadingConstantes || !constantes) return null;

  async function handleSalvar() {
    console.log("Salvando");
  }

  return (
    <>
      <header>
        <Title>Alocação de Critérios - {ciclo.nome}</Title>
        <S.Subtitle>
          <div>
            {" "}
            Status:{" "}
            <span className="infos">
              {ciclo.status.toLocaleUpperCase()}
            </span>{" "}
          </div>
          |
          <div>
            {" "}
            Período:{" "}
            <span className="infos">
              {ciclo.dataInicio} a {ciclo.dataFim}
            </span>{" "}
          </div>
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
          {criteriosPorTipo.map((criterio, idx) => {
            const id = criterio.idCriterio || `${tipo}-${idx}`;
            const checked = !!checkedCriterios[id];

            return (
              <ExpandableCard
                key={id}
                // title={criterio.nome}
                // subtitle={criterio.descricao}
                expanded={checked}
                onToggle={() =>
                  setCheckedCriterios((prev) => ({
                    ...prev,
                    [id]: !prev[id],
                  }))
                }
                header={
                  <S.CardHeader>
                    <S.CriteriaInfo>
                      <div>
                        <S.CriteriaTitle>{criterio.nome}</S.CriteriaTitle>
                        <S.CriteriaDescription>
                          {criterio.descricao}
                        </S.CriteriaDescription>
                      </div>
                    </S.CriteriaInfo>
                    <S.CriteriaActions>
                      <S.CriteriaContainer>
                        <S.CriteriaLabel>Peso do critério</S.CriteriaLabel>
                        <S.CriteriaValue>
                          {Number(criterio.peso).toFixed(1)}
                        </S.CriteriaValue>
                      </S.CriteriaContainer>
                    </S.CriteriaActions>
                  </S.CardHeader>
                }
              >
                <S.InfoGrid>
                  <div>
                    <S.Label>Trilhas</S.Label>
                    <Select
                      isMulti={true}
                      placeholder="Selecionar trilhas"
                      options={trilhasOptions}
                      value={criteriosSelecionados[id]?.trilhas || []}
                      onChange={(val) => updateTrilhas(id, val as string[])}
                    />
                    <S.BadgeList>
                      {criteriosSelecionados[id]?.trilhas?.includes("ALL") ? (
                        <S.Badge key="ALL">
                          Todas
                          <button onClick={() => updateTrilhas(id, [])}>
                            ×
                          </button>
                        </S.Badge>
                      ) : (
                        criteriosSelecionados[id]?.trilhas?.map((trilha) => {
                          const label = trilhas.find(
                            (t) => t.value === trilha
                          )?.label;
                          return (
                            <S.Badge key={trilha}>
                              {label}
                              <button
                                onClick={() =>
                                  updateTrilhas(
                                    id,
                                    criteriosSelecionados[id].trilhas.filter(
                                      (t) => t !== trilha
                                    )
                                  )
                                }
                              >
                                ×
                              </button>
                            </S.Badge>
                          );
                        })
                      )}
                    </S.BadgeList>
                  </div>
                  <div>
                    <S.Label>Unidades</S.Label>
                    <Select
                      placeholder="Selecionar unidades"
                      isMulti={true}
                      options={unidadesOptions}
                      value={criteriosSelecionados[id]?.unidades || []}
                      onChange={(val) => updateUnidades(id, val as string[])}
                    />
                    <S.BadgeList>
                      {criteriosSelecionados[id]?.unidades?.includes("ALL") ? (
                        <S.Badge key="ALL">
                          Todas
                          <button onClick={() => updateUnidades(id, [])}>
                            ×
                          </button>
                        </S.Badge>
                      ) : (
                        criteriosSelecionados[id]?.unidades?.map((unidade) => {
                          const label = unidades.find(
                            (u) => u.value === unidade
                          )?.label;
                          return (
                            <S.Badge key={unidade}>
                              {label}
                              <button
                                onClick={() =>
                                  updateUnidades(
                                    id,
                                    criteriosSelecionados[id].unidades.filter(
                                      (u) => u !== unidade
                                    )
                                  )
                                }
                              >
                                ×
                              </button>
                            </S.Badge>
                          );
                        })
                      )}
                    </S.BadgeList>
                  </div>
                </S.InfoGrid>
              </ExpandableCard>
            );
          })}
        </div>
      </Card>
      <ButtonFrame text="Para salvar os critérios, clique no botão de salvar.">
        <Button variant="primary" onClick={handleSalvar}>
          Salvar
        </Button>
      </ButtonFrame>
    </>
  );
}

export default CycleCriteriaPage;
