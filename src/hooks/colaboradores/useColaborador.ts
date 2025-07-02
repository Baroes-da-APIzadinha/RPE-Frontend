import { associarPerfil, criarColaborador } from "@/services/HTTP/colaboradores";
import { useState } from "react";

export function useCreateColaborador() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create(data: {
    nomeCompleto: string;
    email: string;
    senha: string;
    cargo: string;
    trilhaCarreira: string;
    unidade: string;
    tiposPerfil: string[]; 
  }) {
    setLoading(true);
    setError(null);

    try {
      const colaborador = await criarColaborador({
        nomeCompleto: data.nomeCompleto,
        cargo: data.cargo,
        email: data.email,
        senha: data.senha,
        trilhaCarreira: data.trilhaCarreira,
        unidade: data.unidade,
      });

      console.log({
        nomeCompleto: data.nomeCompleto,
        cargo: data.cargo,
        email: data.email,
        senha: data.senha,
        trilhaCarreira: data.trilhaCarreira,
        unidade: data.unidade,
        });


      const idColaborador = colaborador?.idColaborador;

      for (const tipo of data.tiposPerfil) {
        await associarPerfil({
          idColaborador,
          tipoPerfil: tipo.toUpperCase() as any,
        });
      }

      return colaborador;
    } catch (err: any) {
      setError(err?.message || "Erro ao criar colaborador");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, error };
}
