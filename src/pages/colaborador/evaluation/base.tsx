import React, { useState } from "react";
import * as S from "./styles";
import { Sidebar } from "@/components/Sidebar";
import { ToggleBar } from "@/components/ToggleBar";
import AutoEvaluationForm from "./autoevaluation/AutoEvaluationForm";

const toggleItems = [
  { value: "auto", label: "Autoavaliação" },
  { value: "360", label: "360°" },
  { value: "gestor", label: "Gestor" },
];

export function EvaluationBasePage() {
  const [selected, setSelected] = useState("auto");

  return (
    <S.Wrapper>
      <Sidebar
        roles={["colaborador", "gestor", "rh", "comite"]}
        mainRole="colaborador"
        userName="João Gomes"
      />
      <S.Main>
        <ToggleBar items={toggleItems} value={selected} onChange={setSelected} />
        {selected === "auto" && <AutoEvaluationForm />}
        {/* Adicione outros formulários para gestor/360 aqui */}
      </S.Main>
    </S.Wrapper>
  );
}

export default EvaluationBasePage;
