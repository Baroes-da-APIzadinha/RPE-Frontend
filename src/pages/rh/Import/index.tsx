import * as S from "./styles.ts";
import { Title } from "@/components/Title/index.tsx";
import { CardImportData } from "@/components/CardImportData/index.tsx";
import { useEffect } from "react";
import { useExportacaoTemplate } from "@/hooks/rh/useExportacaoTemplate";
import { useImportacaoAvaliacoes } from "@/hooks/rh/useImportacaoAvaliacoes";
import { toast } from "sonner";

export function Import() {
  const { downloadTemplate } = useExportacaoTemplate();
  const {
    importAvaliacoes,
    error: importError,
    success: importSuccess,
  } = useImportacaoAvaliacoes();

  // Monitorar mudanças no estado da importação
  useEffect(() => {
    if (importSuccess) {
      toast.success("Importação de avaliações iniciada com sucesso!");
    }
    if (importError) {
      toast.error(importError);
    }
  }, [importSuccess, importError]);

  return (
    <>
      <>
        <S.Header>
          <Title>Importação de Dados</Title>
        </S.Header>

        <S.CardContainer>
          <CardImportData
            title="Importar Dados"
            subtitle="Importe todos os dados em massa através de planilha Excel"
            formatoEsperado="xlsx, xls, csv"
            onDownloadTemplate={downloadTemplate}
            onFileSelect={async (file) => {
              // Por padrão, vamos importar como avaliações
              await importAvaliacoes(file);
            }}
          />
        </S.CardContainer>
      </>
    </>
  );
}
