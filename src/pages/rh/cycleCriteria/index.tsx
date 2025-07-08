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
import { useParams } from "react-router-dom"; // caso precise do id do ciclo

export function CycleCriteriaPage() {
  const { criterios, fetchAllPilares } = useCriterios();

  const [tipo, setTipo] = React.useState<"execucao" | "comportamento" | "gestao">("execucao");
  const [checkedCriterios, setCheckedCriterios] = React.useState<Record<string, boolean>>({});
  const [criteriosSelecionados, setCriteriosSelecionados] = useState<Record<string, { trilhas: string[]; unidades: string[] }>>({});

  const categorias = [
    { value: "execucao", label: "Execução" },
    { value: "comportamento", label: "Comportamento" },
    { value: "gestao", label: "Gestão e Liderança" },
  ];

  const pilaresMap: Record<string, keyof typeof criterios> = {
    execucao: "Execucao",
    comportamento: "Comportamento",
    gestao: "Gestao_e_Lideranca",
  };

  useEffect(() => {
    fetchAllPilares();
  }, [fetchAllPilares]);

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

  const criteriosPorTipo = criterios[pilaresMap[tipo]] || [];

  const { constantes, loading: loadingConstantes } = useColaboradorConstantes();

  const trilhas = constantes?.trilhas.map((value) => ({ value, label: formatar(value) })) || [];
  const unidades = constantes?.unidades.map((value) => ({ value, label: formatar(value) })) || [];

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
    (selecionado.trilhas?.length > 0 && selecionado.unidades?.length > 0)
  );
}


  async function handleSalvar() {
    console.log("Salvar critérios selecionados para o ciclo:", criteriosSelecionados);
    // Aqui você fará o POST associando critérios ao ciclo
  }

  if (loadingConstantes || !constantes) return null;

  return (
    <>
      <header>
        <Title>Alocação de Critérios</Title>
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
                        <S.CriteriaTitle>{criterio.nomeCriterio}</S.CriteriaTitle>
                        <S.CriteriaDescription>{criterio.descricao}</S.CriteriaDescription>
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
                        <S.CriteriaValue>{Number(criterio.peso).toFixed(1)}</S.CriteriaValue>
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
                    />
                    <S.BadgeList>
                      {criteriosSelecionados[id]?.trilhas?.map((trilha) => {
                        const label = trilhas.find((t) => t.value === trilha)?.label || trilha;
                        return (
                          <S.Badge key={trilha}>
                            {label}
                            <button onClick={() =>
                              updateTrilhas(id, criteriosSelecionados[id].trilhas.filter((t) => t !== trilha))
                            }>×</button>
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
                    />
                    <S.BadgeList>
                      {criteriosSelecionados[id]?.unidades?.map((unidade) => {
                        const label = unidades.find((u) => u.value === unidade)?.label || unidade;
                        return (
                          <S.Badge key={unidade}>
                            {label}
                            <button onClick={() =>
                              updateUnidades(id, criteriosSelecionados[id].unidades.filter((u) => u !== unidade))
                            }>×</button>
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
        <Button onClick={handleSalvar}>
          Salvar
        </Button>
      </ButtonFrame>
    </>
  );
}

export default CycleCriteriaPage;
