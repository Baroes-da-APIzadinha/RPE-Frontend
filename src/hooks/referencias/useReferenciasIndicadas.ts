// src/hooks/referencias/useReferenciasIndicadas.ts
import { useQuery } from "@tanstack/react-query";
import { listarReferenciasIndicadas } from "@/services/HTTP/referencias";

export function useReferenciasIndicadas(idIndicador: string) {
  return useQuery({
    queryKey: ["referencias-indicadas", idIndicador],
    queryFn: () => listarReferenciasIndicadas(idIndicador),
    enabled: !!idIndicador,
  });
}
