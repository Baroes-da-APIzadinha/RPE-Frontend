import { useTheme } from "styled-components";
import RowProgressBox from "@/components/RowProgressBox";
import StatusRowBox from "@/components/StatusRowBox";
import { Title } from "@/components/Title";
import { useCicloAtual } from "@/hooks/useCicloAtual";
import { CicloStatusBox } from "@/components/CicloStatusBox";
import { TableBase } from "@/components/TableBase/index.tsx";

export function ColaboradorHome() {
  const theme = useTheme();
  const { cicloAtual } = useCicloAtual();
  
  return (
    <>
      <Title>Olá, João Gomes</Title>

      
      <TableBase title={"Status do ciclo atual"} subtitle={"Veja o status do ciclo atual e as etapas concluídas"}>

      <CicloStatusBox
        steps={[
          { label: "Agendado", active: cicloAtual?.status === "AGENDADO"  },
          { label: "Em Andamento", active: cicloAtual?.status === "EM_ANDAMENTO"  },
          { label: "Em Revisão", active: cicloAtual?.status === "EM_REVISAO" },
          { label: "Em Equalização", active: cicloAtual?.status === "EM_EQUALIZACAO" },
        ]}
        />
        </TableBase>
        
        <RowProgressBox
        title="Progresso no ciclo atual"
        bars={[
          {
            subtitle: "Autoavaliação",
            value: 100,
            color: theme.colors.success.default,
          },
          {
            subtitle: "Avaliação 360°",
            value: 10,
            color: theme.colors.error.default,
          },
          {
            subtitle: "Avaliação do Gestor",
            value: 0,
            color: theme.colors.secondary.default,
          },
        ]}
      />
      <StatusRowBox
        title="Situação das Metas"
        subtitle="Resumo do status de cada meta"
        items={[
          { value: "Concluida", label: "Autoavaliação" },
          {
            value: "Em andamento",
            label: "Avaliação 360",
            concluidas: 1,
            total: 5,
          },
          { value: "Pendente", label: "Avaliação do gestor" },
        ]}
      />
    </>
  );
}
