import { useState } from "react";
import { ToggleBar } from "@/components/ToggleBar";
import AutoEvaluationForm from "./autoevaluation/AutoEvaluationForm";
import { ReferencesPage } from "./references";
import Table360 from "./360Evaluation/Table/360Table";
import EvaluationDetails from "./360Evaluation/Form/360Form";
import {
  MdPerson,
  MdGroups,
  MdSupervisorAccount,
  MdOutlineStar,
} from "react-icons/md";
import { MentoringPage } from "./mentoring";

const toggleItems = [
  { value: "auto", label: "Autoavaliação", icon: <MdPerson /> },
  { value: "360", label: "360°", icon: <MdGroups /> },
  { value: "mentor", label: "Mentor", icon: <MdSupervisorAccount /> },
  { value: "references", label: "Referencias", icon: <MdOutlineStar /> },
];

export function EvaluationBasePage() {
  const [selected, setSelected] = useState("auto");
  const [avaliandoColaboradorId, setAvaliandoColaboradorId] = useState<
    number | null
  >(null);

  return (
    <div>
      <ToggleBar items={toggleItems} value={selected} onChange={setSelected} />
      {selected === "auto" && <AutoEvaluationForm />}
      {selected === "360" && (
        <>
          {avaliandoColaboradorId === null ? (
            <Table360 onSelect={(id) => setAvaliandoColaboradorId(id)} />
          ) : (
            <EvaluationDetails
              id={avaliandoColaboradorId}
              onBack={() => setAvaliandoColaboradorId(null)}
            />
          )}
        </>
      )}

      {selected === "mentor" && <MentoringPage />}
      {selected === "references" && <ReferencesPage />}
    </div>
  );
}

export default EvaluationBasePage;
