import { Title } from "@/components/Title";
import Button from "@/components/Button";
import * as S from "./styles";
import { Card } from "@/components/Card";
import { ToggleBar } from "@/components/ToggleBar";
import { MdAssignment } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { ExpandableCard } from "@/components/ExpandableCard";
import { Select } from "@/components/Select";
import { useColaboradorConstantes } from "@/hooks/colaboradores/useColaboradorConstantes";
import ButtonFrame from "@/components/ButtonFrame";
import { useCriterios } from "@/hooks/useCriterios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAssociacoesCriterioCiclo } from "@/hooks/useAssociacoesCriterioCiclo";
import { toast } from "sonner";

export function CycleCriteriaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ciclo = location.state?.ciclo || location.state?.cicloAtivo;

  if (!ciclo) {
    navigate("/rh/cycle");
    return <p>Ciclo Não encontrado</p>;
  }

  const { criterios, fetchAllPilares } = useCriterios();
  const {
    associacoes,
    adicionarAssociacao,
    editarAssociacao,
    deletarAssociacao,
  } = useAssociacoesCriterioCiclo(ciclo.idCiclo);

  const [tipo, setTipo] = React.useState<
    "execucao" | "comportamento" | "gestao"
  >("comportamento");
  const [checkedCriterios, setCheckedCriterios] = React.useState<
    Record<string, boolean>
  >({});
  const [criteriosSelecionados, setCriteriosSelecionados] = useState<
    Record<string, { trilhas: string[]; unidades: string[] }>
  >({});

  const categorias = [
    { value: "comportamento", label: "Comportamento" },
    { value: "execucao", label: "Execução" },
    { value: "gestao", label: "Gestão e Liderança" },
  ];

  const pilaresMap: Record<string, keyof typeof criterios> = {
    execucao: "Execucao",
    comportamento: "Comportamento",
    gestao: "Gestao_e_Lideranca",
  };

  const [remocoesPendentes, setRemocoesPendentes] = useState<
    { idCriterio: string; trilha: string; unidade: string }[]
  >([]);

  useEffect(() => {
    fetchAllPilares();
  }, [fetchAllPilares]);

  function updateTrilhas(id: string, values: string[]) {
    const trilhasAnteriores = criteriosSelecionados[id]?.trilhas || [];

    const removidas = trilhasAnteriores.filter(
      (t) => !values.includes(t) && t !== "ALL"
    );

    removidas.forEach((trilhaRemovida) => {
      const unidadesAtuais = criteriosSelecionados[id]?.unidades || [];

      unidadesAtuais.forEach((unidade) => {
        setRemocoesPendentes((prev) => [
          ...prev,
          { idCriterio: id, trilha: trilhaRemovida, unidade },
        ]);
      });
    });

    setCriteriosSelecionados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        trilhas: values.includes("ALL") ? ["ALL"] : values,
      },
    }));
  }

  function updateUnidades(id: string, values: string[]) {
    const unidadesAnteriores = criteriosSelecionados[id]?.unidades || [];

    const removidas = unidadesAnteriores.filter(
      (u) => !values.includes(u) && u !== "ALL"
    );

    removidas.forEach((unidadeRemovida) => {
      const trilhasAtuais = criteriosSelecionados[id]?.trilhas || [];

      trilhasAtuais.forEach((trilha) => {
        setRemocoesPendentes((prev) => [
          ...prev,
          { idCriterio: id, trilha, unidade: unidadeRemovida },
        ]);
      });
    });

    setCriteriosSelecionados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        unidades: values.includes("ALL") ? ["ALL"] : values,
      },
    }));
  }

  const criteriosOriginais = criterios[pilaresMap[tipo]] || [];

  const criteriosPorTipo =
    ciclo.status !== "AGENDADO"
      ? criteriosOriginais.filter((criterio) =>
          associacoes.some((assoc) => assoc.idCriterio === criterio.idCriterio)
        )
      : criteriosOriginais;

  const isEditable = ciclo.status === "AGENDADO";

  const { constantes, loading: loadingConstantes } = useColaboradorConstantes();

  const trilhas =
    constantes?.trilhas.map((value) => ({ value, label: formatar(value) })) ||
    [];
  const unidades =
    constantes?.unidades.map((value) => ({ value, label: formatar(value) })) ||
    [];

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

  function isCriterioAtivoNoCiclo(id: string): boolean {
    const selecionado = criteriosSelecionados[id];
    return (
      selecionado &&
      selecionado.trilhas?.length > 0 &&
      selecionado.unidades?.length > 0
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  async function handleSalvar() {
    const ativos = Object.entries(criteriosSelecionados).filter(
      ([_, val]) => val.trilhas?.length && val.unidades?.length
    );

    const novasChaves = new Set<string>();

    for (const [idCriterio, { trilhas, unidades }] of ativos) {
      const trilhasProcessadas =
        trilhas.includes("ALL") && constantes ? constantes.trilhas : trilhas;
      const unidadesProcessadas =
        unidades.includes("ALL") && constantes ? constantes.unidades : unidades;

      for (const trilha of trilhasProcessadas) {
        for (const unidade of unidadesProcessadas) {
          const chave = `${idCriterio}-${trilha}-${unidade}`;
          novasChaves.add(chave);

          const existente = associacoes.find(
            (a) =>
              a.idCriterio === idCriterio &&
              a.trilhaCarreira === trilha &&
              a.unidade === unidade
          );

          const payload = {
            idCiclo: ciclo.idCiclo,
            idCriterio,
            trilhaCarreira: trilha,
            unidade,
          };

          try {
            if (existente) {
              await editarAssociacao(existente.idAssociacao, payload);
            } else {
              await adicionarAssociacao(payload);
            }
          } catch (err) {
            console.error("Erro ao salvar associação:", err);
          }
        }
      }
    }

    for (const rem of remocoesPendentes) {
      const assoc = associacoes.find(
        (a) =>
          a.idCriterio === rem.idCriterio &&
          a.trilhaCarreira?.toUpperCase() === rem.trilha?.toUpperCase() &&
          a.unidade?.toUpperCase() === rem.unidade?.toUpperCase()
      );

      if (assoc) {
        try {
          await deletarAssociacao(assoc.idAssociacao);
        } catch (err) {
          console.error("Erro ao deletar associação removida:", err);
        }
      }
    }

    setRemocoesPendentes([]);

    toast.success("Critérios atualizados com sucesso!");
  }

  useEffect(() => {
    if (!associacoes || associacoes.length === 0) return;

    const map: Record<string, { trilhas: string[]; unidades: string[] }> = {};

    for (const assoc of associacoes) {
      const { idCriterio, trilhaCarreira, unidade } = assoc;

      if (!map[idCriterio]) {
        map[idCriterio] = { trilhas: [], unidades: [] };
      }

      if (trilhaCarreira && !map[idCriterio].trilhas.includes(trilhaCarreira)) {
        map[idCriterio].trilhas.push(trilhaCarreira);
      }

      if (unidade && !map[idCriterio].unidades.includes(unidade)) {
        map[idCriterio].unidades.push(unidade);
      }
    }

    setCriteriosSelecionados(map);
  }, [associacoes]);

  if (loadingConstantes || !constantes) return null;

  return (
    <>
      <header>
        <Title>Alocação de Critérios - {ciclo.nomeCiclo}</Title>
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
              {formatDate(ciclo.dataInicio)} a {formatDate(ciclo.dataFim)}
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
          {criteriosPorTipo.map((criterio) => {
            const id = criterio.idCriterio;
            const checked = !!checkedCriterios[id];

            return (
              <ExpandableCard
                key={id}
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
                        <S.CriteriaTitle>
                          {criterio.nomeCriterio}
                        </S.CriteriaTitle>
                        <S.CriteriaDescription>
                          {criterio.descricao}
                        </S.CriteriaDescription>
                      </div>
                    </S.CriteriaInfo>
                    <S.CriteriaActions>
                      <S.CriteriaContainer>
                        <S.CriteriaBadge ativo={isCriterioAtivoNoCiclo(id)}>
                          {isCriterioAtivoNoCiclo(id) ? "Ativo" : "Inativo"}
                        </S.CriteriaBadge>
                      </S.CriteriaContainer>
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
                      isMulti
                      placeholder="Selecionar trilhas"
                      options={trilhasOptions}
                      value={criteriosSelecionados[id]?.trilhas || []}
                      onChange={(val) => updateTrilhas(id, val as string[])}
                      disabled={!isEditable}
                    />
                    <S.BadgeList>
                      {criteriosSelecionados[id]?.trilhas?.map((trilha) => {
                        const label =
                          trilha === "ALL"
                            ? "Todas"
                            : trilhas.find((t) => t.value === trilha)?.label ||
                              trilha;
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
                      })}
                    </S.BadgeList>
                  </div>

                  <div>
                    <S.Label>Unidades</S.Label>
                    <Select
                      isMulti
                      placeholder="Selecionar unidades"
                      options={unidadesOptions}
                      value={criteriosSelecionados[id]?.unidades || []}
                      onChange={(val) => updateUnidades(id, val as string[])}
                      disabled={!isEditable}
                    />
                    <S.BadgeList>
                      {criteriosSelecionados[id]?.unidades?.map((unidade) => {
                        const label =
                          unidade === "ALL"
                            ? "Todas"
                            : unidades.find((u) => u.value === unidade)
                                ?.label || unidade;
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
                      })}
                    </S.BadgeList>
                  </div>
                </S.InfoGrid>
              </ExpandableCard>
            );
          })}
        </div>
      </Card>

      <ButtonFrame text="Para salvar os critérios, clique no botão de salvar.">
        <Button onClick={handleSalvar} variant="primary" disabled={!isEditable}>
          Salvar
        </Button>
      </ButtonFrame>
    </>
  );
}

export default CycleCriteriaPage;
