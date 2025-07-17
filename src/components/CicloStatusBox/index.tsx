import React from "react";
import * as S from "./style.ts";
import { LuCheck } from "react-icons/lu";

type Step = {
  label: string;
  active: boolean;
  completed?: boolean; // Optional property to indicate if the step is completed
};

type Props = {
  steps: Step[];
};

export function CicloStatusBox({ steps }: Props) {
  let completed = true; // Variável para rastrear se os estágios anteriores foram concluídos

  return (
    <S.TimelineContainer>
      {steps.map((step, index) => {
        const isCompleted = completed && !step.active; // Define como concluído se os estágios anteriores foram concluídos e não está ativo
        if (step.active) {
          completed = false; // Interrompe a conclusão para os próximos estágios
        }

        return (
          <React.Fragment key={index}>
            <S.Step active={step.active} completed={isCompleted}>
              {" "}
              <div className="circle">
                {isCompleted && (
                  <LuCheck size={24} strokeWidth={3} color="white" />
                )}
              </div>
              <div className="label">{step.label}</div>
            </S.Step>
            {index < steps.length - 1 && <S.Line />}{" "}
          </React.Fragment>
        );
      })}
    </S.TimelineContainer>
  );
}
