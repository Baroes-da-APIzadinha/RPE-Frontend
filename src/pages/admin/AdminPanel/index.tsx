import React, { useState } from "react";
import * as S from "./styles.ts";
import { Card } from "@/components/Card";
import { Title } from "@/components/Title";
import { Select } from "@/components/Select";
import { Modal } from "@/components/Modal";
import Button from "@/components/Button";
import { EmptyMessage } from "@/components/EmptyMensage";
import { useOutletContext } from "react-router-dom";
import { useAdminActions } from "@/hooks/admin/useAdminActions";
import { useTodosCiclos } from "@/hooks/useTodosCiclos";
import {
  MdAdminPanelSettings,
  MdSync,
  MdWarning,
  MdChangeCircle,
} from "react-icons/md";
import { toast } from "sonner";
import type { PerfilData } from "@/types/PerfilData";
import { LoadingMessage } from "@/components/LoadingMessage/index.tsx";

const AdminPage: React.FC = () => {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { loading, forceSync, changeCycleStatus } = useAdminActions();
  const { ciclos, loading: ciclosLoading, refetch } = useTodosCiclos();

  const [selectedCycle, setSelectedCycle] = useState<string>("");
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Verificar se o usuário tem permissão de admin
  if (!perfil.roles.includes("admin")) {
    return (
      <EmptyMessage
        icon={<MdAdminPanelSettings size={32} />}
        title="Acesso Negado"
        description="Esta página está disponível apenas para administradores do sistema."
      />
    );
  }

  if (ciclosLoading) {
    return (
      <LoadingMessage message="Carregando ciclos de avaliação e permissões administrativas..." />
    );
  }

  if (ciclos.length === 0) {
    return (
      <EmptyMessage
        icon={<MdChangeCircle size={32} />}
        title="Nenhum ciclo encontrado"
        description="Não há ciclos de avaliação cadastrados no momento. Aguarde a configuração inicial ou sincronize com o ERP."
      />
    );
  }

  // Opções de ciclos
  const cycleOptions = ciclos.map((ciclo: any) => ({
    label: `${ciclo.nomeCiclo} (${ciclo.status})`,
    value: ciclo.idCiclo,
  }));

  const handleSyncConfirm = async () => {
    try {
      await forceSync();
      toast.success("Sincronização com ERP realizada com sucesso!");
      setShowSyncModal(false);
    } catch (error) {
      toast.error("Erro ao sincronização com ERP");
    }
  };

  const handleStatusChange = async () => {
    if (!selectedCycle) {
      toast.error("Selecione um ciclo");
      return;
    }

    // Encontrar o ciclo selecionado para obter o status atual
    const selectedCycleData = ciclos.find(
      (c: any) => c.idCiclo === selectedCycle
    );
    if (!selectedCycleData) {
      toast.error("Ciclo não encontrado");
      return;
    }

    try {
      await changeCycleStatus(selectedCycle, selectedCycleData.status);
      toast.success("Status do ciclo alterado com sucesso!");
      setShowStatusModal(false);
      setSelectedCycle("");
      // Recarregar ciclos após alteração
      refetch();
    } catch (error) {
      toast.error("Erro ao alterar status do ciclo");
    }
  };

  const getSelectedCycleName = () => {
    const cycle = ciclos.find((c: any) => c.idCiclo === selectedCycle);
    return cycle ? cycle.nomeCiclo : "";
  };

  const getNextStatus = () => {
    const selectedCycleData = ciclos.find(
      (c: any) => c.idCiclo === selectedCycle
    );
    if (!selectedCycleData) return "";

    const statusSequence = [
      "AGENDADO",
      "EM_ANDAMENTO",
      "EM_REVISAO",
      "EM_EQUALIZAÇÃO",
      "FECHADO",
    ];

    const statusLabels = {
      AGENDADO: "Agendado",
      EM_ANDAMENTO: "Em Andamento",
      EM_REVISAO: "Em Revisão",
      EM_EQUALIZAÇÃO: "Em Equalização",
      FECHADO: "Fechado",
    };

    const currentIndex = statusSequence.indexOf(selectedCycleData.status);
    if (currentIndex === -1 || currentIndex === statusSequence.length - 1) {
      return "";
    }

    const nextStatus = statusSequence[currentIndex + 1];
    return statusLabels[nextStatus as keyof typeof statusLabels] || nextStatus;
  };

  const getCurrentStatus = () => {
    const selectedCycleData = ciclos.find(
      (c: any) => c.idCiclo === selectedCycle
    );
    if (!selectedCycleData) return "";

    const statusLabels = {
      AGENDADO: "Agendado",
      EM_ANDAMENTO: "Em Andamento",
      EM_REVISAO: "Em Revisão",
      EM_EQUALIZAÇÃO: "Em Equalização",
      FECHADO: "Fechado",
    };

    return (
      statusLabels[selectedCycleData.status as keyof typeof statusLabels] ||
      selectedCycleData.status
    );
  };

  return (
    <>
      <S.Header>
        <Title>Painel de Administração</Title>
        <S.Subtitle>
          Comandos exclusivos para administradores do sistema
        </S.Subtitle>
      </S.Header>

      <Card>
        <S.SectionTitle>
          <MdChangeCircle size={24} />
          Alterar Status do Ciclo
        </S.SectionTitle>
        <S.SectionDescription>
          Avance o status de um ciclo para a próxima etapa na sequência:
          Agendado → Em Andamento → Em Revisão → Em Equalização → Fechado
        </S.SectionDescription>

        <S.FormGroup>
          <S.FormItem>
            <label>Selecionar Ciclo</label>
            <Select
              placeholder="Escolha um ciclo"
              value={selectedCycle}
              onChange={(val) =>
                setSelectedCycle(Array.isArray(val) ? val[0] : val)
              }
              options={cycleOptions}
              disabled={ciclosLoading}
            />
          </S.FormItem>
        </S.FormGroup>

        <S.ActionButton>
          <Button
            variant="primary"
            onClick={() => setShowStatusModal(true)}
            disabled={!selectedCycle || loading}
          >
            <MdChangeCircle />
            Avançar Status
          </Button>
        </S.ActionButton>
      </Card>

      <S.StyledCard>
        <S.SectionTitle>
          <MdSync size={24} />
          Sincronização com ERP
        </S.SectionTitle>
        <S.SectionDescription>
          Force a sincronização manual dos dados com o sistema ERP. Esta ação
          pode demorar alguns minutos.
        </S.SectionDescription>
        <S.ActionButton>
          <Button
            variant="secondary"
            onClick={() => setShowSyncModal(true)}
            disabled={loading}
          >
            <MdSync />
            {loading ? "Processando..." : "Forçar Sincronização"}
          </Button>
        </S.ActionButton>
      </S.StyledCard>

      {/* Modal de Confirmação - Sincronização ERP */}
      <Modal
        open={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        title="Confirmar Sincronização"
        icon={<MdWarning />}
        iconColor="warning"
      >
        <S.ModalContent>
          <S.WarningText>
            Você está prestes a forçar uma sincronização manual com o ERP.
          </S.WarningText>
          <S.ModalDescription>
            Esta ação irá:
            <ul>
              <li>Sincronizar dados de colaboradores</li>
              <li>Atualizar informações organizacionais</li>
              <li>Pode demorar alguns minutos para ser concluída</li>
            </ul>
          </S.ModalDescription>
          <S.ModalButtons>
            <Button
              variant="outline"
              onClick={() => setShowSyncModal(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={handleSyncConfirm}
              disabled={loading}
            >
              <MdSync />
              {loading ? "Sincronizando..." : "Confirmar Sincronização"}
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>

      {/* Modal de Confirmação - Alterar Status */}
      <Modal
        open={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title="Confirmar Alteração de Status"
        icon={<MdWarning />}
        iconColor="warning"
      >
        <S.ModalContent>
          <S.WarningText>
            Você está prestes a alterar o status de um ciclo de avaliação.
          </S.WarningText>
          <S.ModalDescription>
            <strong>Ciclo:</strong> {getSelectedCycleName()}
            <br />
            <strong>Status Atual:</strong> {getCurrentStatus()}
            <br />
            <strong>Próximo Status:</strong> {getNextStatus()}
            <br />
            <br />
            Esta ação pode afetar:
            <ul>
              <li>O fluxo normal das avaliações</li>
              <li>A capacidade dos colaboradores de preencher formulários</li>
              <li>Os relatórios e métricas do sistema</li>
            </ul>
          </S.ModalDescription>
          <S.ModalButtons>
            <Button
              variant="outline"
              onClick={() => setShowStatusModal(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleStatusChange}
              disabled={loading}
            >
              <MdChangeCircle />
              {loading ? "Alterando..." : "Confirmar Alteração"}
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </>
  );
};

export default AdminPage;
