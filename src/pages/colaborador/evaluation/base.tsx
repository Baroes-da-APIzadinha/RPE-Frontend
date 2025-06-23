import { useState } from "react";
import * as S from "./styles";
import { Sidebar } from "@/components/Sidebar";
import { ToggleBar } from "@/components/ToggleBar";
import AutoEvaluationForm from "./autoevaluation/AutoEvaluationForm";
import Table360 from "./360Evaluation/360Table";
import { ReferencesPage } from "./references";
import { MdPerson, MdGroups, MdSupervisorAccount, MdOutlineStar } from "react-icons/md";

const toggleItems = [
  { value: "auto", label: "Autoavaliação", icon: <MdPerson /> },
  { value: "360", label: "360°", icon: <MdGroups /> },
  { value: "gestor", label: "Gestor", icon: <MdSupervisorAccount /> },
  { value: "references", label: "Referencias", icon: <MdOutlineStar /> },
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
        {selected === "360" && <Table360 />}
        {/* Adicione outros formulários para gestor/360 aqui */}
        {selected === "references" && <ReferencesPage />}
      </S.Main>
    </S.Wrapper>
  );
}

export default EvaluationBasePage;
