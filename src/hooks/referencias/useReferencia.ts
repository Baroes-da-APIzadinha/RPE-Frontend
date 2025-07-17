// src/hooks/referencias/useReferencias.ts

import { useState } from "react";
import {
  criarReferencia as criarReferenciaRequest,
  atualizarReferencia as atualizarReferenciaRequest,
  deletarReferencia as deletarReferenciaRequest,
} from "@/services/HTTP/referencias";

import type {
  CriarReferenciaPayload,
  AtualizarReferenciaPayload,
} from "@/types/Referencia";

export function useReferencias() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function criarReferencia(payload: CriarReferenciaPayload) {
    setLoading(true);
    setError(null);
    try {
      const response = await criarReferenciaRequest(payload);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function atualizarReferencia(id: string, payload: AtualizarReferenciaPayload) {
    setLoading(true);
    setError(null);
    try {
      const response = await atualizarReferenciaRequest(id, payload);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deletarReferencia(id: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await deletarReferenciaRequest(id);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    criarReferencia,
    atualizarReferencia,
    deletarReferencia,
    loading,
    error,
  };
}
