import * as S from "./styles";
import { Sidebar } from "../Sidebar";
import { usePerfil } from "@/hooks/usePerfil";
import { useGetReminder } from "@/hooks/useGetReminder";
import { LoadingScreen } from "@/pages/Login/LoadinScreen";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCollaboratorReminder } from "@/hooks/useCollaboratorReminder";

export function BaseLayout() {
  const { perfil, loading } = usePerfil();
  const { data: reminderData } = useGetReminder();
  const { getReminder, reminderData: collaboratorReminderData } =
    useCollaboratorReminder();
  const [firstTime, setFirstTime] = useState(true);
  const [collaboratorReminderChecked, setCollaboratorReminderChecked] =
    useState(false);
  const [collaboratorReminderShown, setCollaboratorReminderShown] =
    useState(false);

  // Busca lembrete do colaborador quando o perfil estiver carregado
  useEffect(() => {
    if (perfil?.userId && !collaboratorReminderChecked) {
      getReminder(perfil.userId).catch((error) => {
        console.error("Erro ao buscar lembrete do colaborador:", error);
      });
      setCollaboratorReminderChecked(true);
    }
  }, [perfil, getReminder, collaboratorReminderChecked]);

  // Exibe o lembrete global quando disponível
  useEffect(() => {
    if (reminderData?.hasReminder && reminderData.message && firstTime) {
      toast.info(reminderData.message, {
        duration: 10000, // 10 segundos
        description: "Lembrete do sistema",
      });
      setFirstTime(false);
    }
  }, [reminderData, firstTime]);

  // Exibe o lembrete do colaborador quando disponível
  useEffect(() => {
    if (
      collaboratorReminderData?.hasReminder &&
      collaboratorReminderData.message &&
      !collaboratorReminderShown
    ) {
      if (collaboratorReminderData.message.includes("Parabéns")) {
        toast.success(collaboratorReminderData.message, {
          duration: 10000, // 15 segundos para lembretes do manager
        });
      } else if (collaboratorReminderData.message.includes("Notamos")) {
        toast.warning(collaboratorReminderData.message, {
          duration: 10000, // 15 segundos para lembretes do manager
        });
      } else {
        toast.error(collaboratorReminderData.message, {
          duration: 10000, // 15 segundos para lembretes do manager
        });
      }
      setCollaboratorReminderShown(true);
    }
  }, [collaboratorReminderData, collaboratorReminderShown]);

  if (loading || !perfil) return <LoadingScreen />;

  return (
    <S.Wrapper>
      <Sidebar
        roles={perfil.roles}
        mainRole={perfil.mainRole}
        userName={perfil.userName}
      />
      <S.Main>
        <Outlet context={{ perfil }} />
      </S.Main>
    </S.Wrapper>
  );
}
