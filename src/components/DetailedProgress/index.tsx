import { useState } from "react";
import * as S from "./styles";
import { MdApartment } from "react-icons/md";
import { ToggleBar } from "../ToggleBar";

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

  const dadosUnidade = [
    { label: "São Paulo", value: 65, totalColab: 161 },
    { label: "Rio de Janeiro", value: 42, totalColab: 104 },
    { label: "Belo Horizonte", value: 78, totalColab: 193 },
    { label: "Porto Alegre", value: 53, totalColab: 131 },
    { label: "Recife", value: 31, totalColab: 77 },
  ];

  const dadosTrilha = [
    { label: "Tecnologia", value: 72, totalColab: 89 },
    { label: "Design", value: 60, totalColab: 67 },
    { label: "Gestão", value: 80, totalColab: 101 },
    { label: "Produto", value: 55, totalColab: 58 },
    { label: "Dados", value: 45, totalColab: 49 },
    { label: "Liderança", value: 68, totalColab: 74 },
  ];

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
