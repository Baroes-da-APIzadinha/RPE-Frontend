import { useState } from "react";
import * as S from "./styles";
import { MdApartment } from "react-icons/md";
import { ToggleBar } from "../ToggleBar";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { useConclusionProgressByUnit } from "@/hooks/rh/useConclusionProgressByUnit";
import { useConclusionProgressByBoard } from "@/hooks/rh/useConclusionProgressByBoard";
type ViewMode = "unidade" | "trilha";

interface ProgressItem {
  label: string;
  value: number;
  totalColab: number;
}

interface Props {
  data: ProgressItem[];
  title: string;
}

type TipoProgresso = "unidade" | "trilha";

export function DetailedProgress({ title }: { title: string }) {
  const [tipo, setTipo] = useState<TipoProgresso>("unidade");

  const dadosUnidade = useConclusionProgressByUnit(useCicloAtual().cicloAtual?.id ?? "")
  .data.map((item) => ({
    label: item.nomeUnidade,
    value: Math.round((item.quantConcluidas / item.total) * 100),
    totalColab: item.total,
  }));

  const dadosTrilha = useConclusionProgressByBoard(useCicloAtual().cicloAtual?.id ?? "")
  .data.map((item) => ({
    label: item.nomeTrilha,
    value: Math.round((item.quantConcluidas / item.total) * 100),
    totalColab: item.total,
  }));
    
  

  const dados = tipo === "unidade" ? dadosUnidade : dadosTrilha;

  return (
    <S.Container>
      <S.Header>
        <S.Title>{title}</S.Title>
        <div>
            <ToggleBar
              value={tipo}
              onChange={(val) => setTipo(val as TipoProgresso)}
              items={[
                { label: "Por Unidade", value: "unidade" },
                { label: "Por Trilha", value: "trilha" },
              ]}
            />
        </div>
      </S.Header>

      <S.List>
        {dados.map((item, index) => (
          <S.Item key={index}>
            <S.Label>
              <MdApartment />
              {item.label}
            </S.Label>
            <S.BarContainer>
              <S.BarFill percent={item.value} />
            </S.BarContainer>
            <S.Value>
              {item.value}% ({item.totalColab} colab.)
            </S.Value>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
}
