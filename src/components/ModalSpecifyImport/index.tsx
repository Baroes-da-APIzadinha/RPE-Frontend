import { useState } from "react";
import { CardImportData } from "@/components/CardImportData";
import * as S from "./styles";
import { MdGroup, MdAssignment, MdChecklist, MdClose } from "react-icons/md";
import { ToggleBar } from "../ToggleBar";

type TipoImportacao = "colaboradores" | "avaliacoes" | "criterios";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ModalSpecifyImport({ open, onClose }: Props) {
  const [tipo, setTipo] = useState<TipoImportacao>("colaboradores");

  const labels = {
    colaboradores: "Importar Colaboradores",
    avaliacoes: "Importar Avaliações",
    criterios: "Importar Critérios",
  };

  const descricoes = {
    colaboradores:
      "Importe dados de colaboradores em massa através de planilha Excel",
    avaliacoes:
      "Importe dados de avaliações de ciclos anteriores para análise de tendências",
    criterios:
      "Importe critérios de avaliação específicos por trilha ou unidade",
  };

  const formatos = {
    colaboradores: "Nome, Email, Cargo, Trilha, Unidade, Gestor",
    avaliacoes: "Colaborador, Ciclo, Critério, Nota, Justificativa, Avaliador",
    criterios: "Nome, Descrição, Categoria, Peso, Trilhas Aplicáveis",
  };

  const handleSelect = (file: File) => {
    console.log(`Importando ${tipo}:`, file);
  };


  return (
    <S.Modal open={open}>
      <S.ModalContent>
        <S.CloseButton onClick={onClose}>
          <MdClose size={36} />
        </S.CloseButton>

        <ToggleBar
          value={tipo}
          onChange={(value) => setTipo(value as TipoImportacao)}
          items={[
            {
              value: "colaboradores",
              label: "Colaboradores",
              icon: <MdGroup />,
            },
            {
              value: "avaliacoes",
              label: "Avaliações",
              icon: <MdAssignment />,
            },
            { value: "criterios", label: "Critérios", icon: <MdChecklist /> },
          ]}
        />

        <CardImportData
          title={labels[tipo]}
          subtitle={descricoes[tipo]}
          formatoEsperado={formatos[tipo]}
          onDownloadTemplate={() => console.log(`Download template ${tipo}`)}
          onFileSelect={handleSelect}
        />
      </S.ModalContent>
    </S.Modal>
  );
}
