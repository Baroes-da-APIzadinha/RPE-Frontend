import * as S from "./styles";
import { Sidebar } from "../Sidebar";
import { usePerfil } from "@/hooks/usePerfil";
import { useGetReminder } from "@/hooks/useGetReminder";
import { LoadingScreen } from "@/pages/LoadinScreen";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function BaseLayout() {
  const { perfil, loading } = usePerfil();
  const { data: reminderData } = useGetReminder();
  const [firstTime, setFirstTime] = useState(true);
  
  // Exibe o lembrete quando disponível
  useEffect(() => {
    if ((reminderData?.hasReminder && reminderData.message) && firstTime) {
      toast.info(reminderData.message, {
        duration: 10000, // 10 segundos
        description: "Lembrete do sistema",
      });
      setFirstTime(false);
    }
  }, [reminderData, firstTime]);

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
