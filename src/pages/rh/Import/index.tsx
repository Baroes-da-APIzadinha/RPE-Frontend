import * as S from "./styles.ts";
import Button from "@/components/Button/index.tsx";
import { Title } from "@/components/Title/index.tsx";
import { MdAssignment, MdChecklist, MdGroup, MdHistory } from "react-icons/md";
import { CardImportHistory } from "@/components/CardImportHistory/index.tsx";
import { CardImportData } from "@/components/CardImportData/index.tsx";
import { useState } from "react";
import { Modal } from "@/components/Modal/index.tsx";
import { ToggleBar } from "@/components/ToggleBar/index.tsx";
import { DropdownActions } from "@/components/DropdownActions/index.tsx";
import { useExportacaoTemplate } from "@/hooks/rh/useExportacaoTemplate";

type TipoImportacao = "colaboradores" | "avaliacoes" | "criterios";

export function Import() {
  const { downloadTemplate } = useExportacaoTemplate();

  const [showModal, setShowModal] = useState(false);
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
    <>
      <>
        <S.Header>
          <Title>Importação de Dados</Title>
          <S.HeaderButtons>
            <S.DesktopButtons>
              <Button variant="outline">
                <MdHistory /> Ver Histórico
              </Button>
              <Button onClick={() => setShowModal(true)}>
                Import Específico
              </Button>
            </S.DesktopButtons>

            <S.MobileActions>
              <DropdownActions
                title="Opções"
                orientation="vertical"
                position="bottom"
                actions={[
                  {
                    label: "Ver Histórico",
                    onClick: () => console.log("Ver histórico"),
                    icon: <MdHistory />,
                  },
                  {
                    label: "Import Específico",
                    onClick: () => setShowModal(true),
                  },
                ]}
              />
            </S.MobileActions>
          </S.HeaderButtons>
        </S.Header>

        <S.CardContainer>
          <CardImportData
            title="Importar Dados"
            subtitle="Importe todos os dados em massa através de planilha Excel"
            formatoEsperado="xlsx, xls, csv"
            onDownloadTemplate={downloadTemplate}
            onFileSelect={(file) => console.log("Selecionado:", file)}
          />
          <CardImportHistory
            data={[
              {
                arquivo: "colaboradores_2024_q3.xlsx",
                tipo: "Colaboradores",
                data: "2024-10-15",
                status: "Sucesso",
                registros: 248,
                erros: 0,
              },
              {
                arquivo: "avaliacoes_historicas_2023.xlsx",
                tipo: "Avaliações Históricas",
                data: "2024-10-10",
                status: "Em Andamento",
                registros: 1456,
                erros: 3,
              },
              {
                arquivo: "criterios_personalizados.xlsx",
                tipo: "Critérios",
                data: "2024-10-05",
                status: "Erro",
                registros: 0,
                erros: 12,
              },
            ]}
          />
        </S.CardContainer>
      </>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Importar dados"
        description="Escolha o tipo de importação que deseja realizar"
        icon={<MdChecklist />}
        iconColor="info"
      >
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
            {
              value: "criterios",
              label: "Critérios",
              icon: <MdChecklist />,
            },
          ]}
        />

        <CardImportData
          title={labels[tipo]}
          subtitle={descricoes[tipo]}
          formatoEsperado={formatos[tipo]}
          onDownloadTemplate={() => console.log("Baixar template")}
          onFileSelect={handleSelect}
        />
      </Modal>
    </>
  );
}
