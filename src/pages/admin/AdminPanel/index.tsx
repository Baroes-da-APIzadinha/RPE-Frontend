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
import { MdAdminPanelSettings, MdSync, MdWarning, MdChangeCircle } from "react-icons/md";
import { toast } from "sonner";
import type { PerfilData } from "@/types/PerfilData";

const AdminPage: React.FC = () => {
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { loading, forceSync, changeCycleStatus } = useAdminActions();
  const { ciclos, loading: ciclosLoading, refetch } = useTodosCiclos();
  
  const [selectedCycle, setSelectedCycle] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
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

  // Opções de status para ciclos
  const statusOptions = [
    { label: "Agendado", value: "AGENDADO" },
    { label: "Em Andamento", value: "EM_ANDAMENTO" },
    { label: "Em Revisão", value: "EM_REVISAO" },
    { label: "Em Equalização", value: "EM_EQUALIZACAO" },
    { label: "Fechado", value: "FECHADO" },
  ];

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
    if (!selectedCycle || !selectedStatus) {
      toast.error("Selecione um ciclo e um status");
      return;
    }

    try {
      await changeCycleStatus(selectedCycle, selectedStatus);
      toast.success("Status do ciclo alterado com sucesso!");
      setShowStatusModal(false);
      setSelectedCycle("");
      setSelectedStatus("");
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

  const getStatusLabel = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.label : status;
  };

  return (
    <>
      <S.Header>
        <Title>Painel de Administração</Title>
        <S.Subtitle>Comandos exclusivos para administradores do sistema</S.Subtitle>
      </S.Header>

      <Card>
        <S.SectionTitle>
          <MdChangeCircle size={24} />
          Alterar Status do Ciclo
        </S.SectionTitle>
        <S.SectionDescription>
          Altere manualmente o status de um ciclo de avaliação. Use com cuidado, pois esta ação pode afetar o fluxo normal do sistema.
        </S.SectionDescription>
        
        <S.FormGroup>
          <S.FormItem>
            <label>Selecionar Ciclo</label>
            <Select
              placeholder="Escolha um ciclo"
              value={selectedCycle}
              onChange={(val) => setSelectedCycle(Array.isArray(val) ? val[0] : val)}
              options={cycleOptions}
              disabled={ciclosLoading}
            />
          </S.FormItem>

          <S.FormItem>
            <label>Novo Status</label>
            <Select
              placeholder="Escolha o novo status"
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(Array.isArray(val) ? val[0] : val)}
              options={statusOptions}
              disabled={!selectedCycle}
            />
          </S.FormItem>
        </S.FormGroup>

        <S.ActionButton>
          <Button
            variant="primary"
            onClick={() => setShowStatusModal(true)}
            disabled={!selectedCycle || !selectedStatus || loading}
          >
            <MdChangeCircle />
            Alterar Status
          </Button>
        </S.ActionButton>
      </Card>


      <S.StyledCard>
        <S.SectionTitle>
          <MdSync size={24} />
          Sincronização com ERP
        </S.SectionTitle>
        <S.SectionDescription>
          Force a sincronização manual dos dados com o sistema ERP. Esta ação pode demorar alguns minutos.
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
            <strong>Ciclo:</strong> {getSelectedCycleName()}<br/>
            <strong>Novo Status:</strong> {getStatusLabel(selectedStatus)}
            <br/><br/>
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
