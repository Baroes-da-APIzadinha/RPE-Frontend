import { useState } from 'react';
import { associarPerfil, desassociarPerfil } from '@/services/HTTP/colaboradores';
import type { AssociatePerfilDTO } from '@/services/HTTP/colaboradores';

export function useManageProfiles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manageProfiles = async (
    userId: string,
    arrayToAssociate: AssociatePerfilDTO['tipoPerfil'][],
    arrayToDisassociate: AssociatePerfilDTO['tipoPerfil'][]
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Desassociar perfis
      for (const perfil of arrayToDisassociate) {
        await desassociarPerfil(userId, perfil);
      }

      // Associar perfis
      for (const perfil of arrayToAssociate) {
        await associarPerfil({ idColaborador: userId, tipoPerfil: perfil });
      }
    } catch (err) {
      console.error('Erro ao gerenciar perfis:', err);
      setError('Erro ao gerenciar perfis');
    } finally {
      setLoading(false);
    }
  };

  return {
    manageProfiles,
    loading,
    error
  };
}
