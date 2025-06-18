import Button from "@/components/Button/index.tsx";
import * as S from "./styles.ts";
import { Sidebar } from "@/components/Sidebar/index.tsx";
import { Title } from "@/components/Title/index.tsx";
import { MdHistory } from "react-icons/md";
import { CardImportHistory } from "@/components/CardImportHistory/index.tsx";
import { CardImportData } from "@/components/CardImportData/index.tsx";

export function Import() {
  return (
    <S.Wrapper>
      <Sidebar
        roles={["colaborador", "gestor", "rh", "comite"]}
        mainRole="comite"
        userName="João Gomes"
      />
      <S.Main>
        <S.Header>
          <Title>Importação de Dados</Title>
          <S.HeaderButtons>
            <Button>
              Opções
            </Button>
            <Button variant="outline">
              {" "}
              <MdHistory /> Ver Histórico
            </Button>
          </S.HeaderButtons>
        </S.Header>

        <S.CardContainer>
          <CardImportData
            title="Importar Dados"
            subtitle="Importe todos os dados em massa através de planilha Excel"
            formatoEsperado="xlsx, xls, csv"
            onDownloadTemplate={() => console.log("Baixar template")}
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
      </S.Main>
    </S.Wrapper>
  );
}
