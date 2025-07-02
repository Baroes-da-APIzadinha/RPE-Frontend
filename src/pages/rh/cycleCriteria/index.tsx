import { Title } from "@/components/Title";
import { criteriosIniciais } from "@/data/crietrios";
import { cicloAtual } from "@/data/manageCycle";
import Button from "@/components/Button";
import * as S from "./styles";
import { Card } from "@/components/Card";
import { ToggleBar } from "@/components/ToggleBar";
import { MdAssignment } from "react-icons/md";
import React from "react";
import { Checkbox } from "@/components/CheckBox";
import { ExpandableCard } from "@/components/ExpandableCard";
import { Select } from "@/components/Select";
import { useColaboradorConstantes } from "@/hooks/colaboradores/useColaboradorConstantes";

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

  const categorias = [
    { value: "execucao", label: "Execução" },
    { value: "comportamento", label: "Comportamento" },
    { value: "gestao", label: "Gestão e Liderança" },
  ];

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
                  <div>
                    <p>{criterio.nome}</p>
                    <p>{criterio.descricao}</p>
                  </div>
                }
              >
                <S.InfoGrid>
                  <div>
                    <S.Label>Peso do critério</S.Label>
                    <p>{Number(criterio.peso).toFixed(1)}</p>
                  </div>
                  <div>
                    <S.Label>Trilhas</S.Label>
                    <Select
                      placeholder="Selecionar trilhas"
                      // isMulti
                      options={trilhas}
                      onChange={(values) => console.log("Trilhas:", values)}
                    />
                  </div>
                  <div>
                    <S.Label>Unidades</S.Label>
                    <Select
                      placeholder="Selecionar unidades"
                      // isMulti
                      options={unidades}
                      onChange={(values) => console.log("Unidades:", values)}
                    />
                  </div>
                </S.InfoGrid>
              </ExpandableCard>
            );
          })}
        </div>
      </Card>

      <Button>Salvar Alocação</Button>
    </>
  );
}

export default CycleCriteriaPage;
