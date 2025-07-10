import Button from "@/components/Button";
import * as S from "./styles.ts";
import {
  MdAdd,
  MdOutlineAdd,
  MdOutlineCode,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineGroup,
} from "react-icons/md";
import { Modal } from "@/components/Modal/index.tsx";
import { useEffect, useState } from "react";
import theme from "@/styles/theme.ts";
import { Select } from "@/components/Select";
import type { TipoReferencia } from "@/types/Referencia.tsx";
import type { PerfilData } from "@/types/PerfilData.tsx";
import { getAvaliacaoParesByUserId } from "@/services/HTTP/avaliacoes.ts";
import { useOutletContext } from "react-router-dom";
import {
  atualizarReferencia,
  criarReferencia,
  deletarReferencia,
} from "@/services/HTTP/referencias.ts";
import { toast } from "sonner";
import { useReferenciasIndicadas } from "@/hooks/referencias/useReferenciasIndicadas.ts";

type Referencia = {
  id?: string;
  idAvaliado: string;
  nome: string;
  tipo: TipoReferencia;
  justificativa: string;
};

type Avaliado = {
  idAvaliacao: string;
  idCiclo: string;
  idAvaliado: string;
  nome: string;
  cargo?: string;
};

export function ReferencesPage() {
  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState<TipoReferencia | null>(null);
  const [justificativa, setJustificativa] = useState("");
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { perfil } = useOutletContext<{ perfil: PerfilData }>();
  const { data: referenciasSalvas, isSuccess } = useReferenciasIndicadas(
    perfil?.userId || ""
  );
  const [avaliados, setAvaliados] = useState<Avaliado[]>([]);
  const [idAvaliadoSelecionado, setIdAvaliadoSelecionado] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!perfil?.userId) return;

    getAvaliacaoParesByUserId(perfil.userId)
      .then((res) => {
        const dados = res?.avaliacoes || [];

        const avaliadosFormatados = dados.map((item: any) => ({
          idAvaliacao: item.idAvaliacao,
          idCiclo: item.idCiclo,
          idAvaliado: item.idAvaliado,
          nome: item.avaliado?.nomeCompleto || "Nome não encontrado",
          cargo: item.avaliado?.cargo || "Cargo não informado",
        }));

        setAvaliados(avaliadosFormatados);
      })
      .catch((err) => {
        console.error("Erro ao buscar avaliações de pares:", err);
        toast.error("Erro ao carregar colaboradores disponíveis.");
      });
  }, [perfil?.userId]);

  useEffect(() => {
    if (!isSuccess || !referenciasSalvas) return;

    const referenciasComNome = referenciasSalvas.map((ref: any) => {
      const avaliado = avaliados.find((a) => a.idAvaliado === ref.idIndicado);
      return {
        id: ref.idIndicacao,
        idAvaliado: ref.idIndicado,
        nome: avaliado?.nome || "Colaborador não encontrado",
        tipo: ref.tipo,
        justificativa: ref.justificativa,
      };
    });

    setReferencias(referenciasComNome);
  }, [isSuccess, referenciasSalvas, avaliados]);

  const handleIndicar = async () => {
    if (!idAvaliadoSelecionado || !tipo || !justificativa || !perfil?.userId)
      return;

    const avaliado = avaliados.find(
      (a) => a.idAvaliado === idAvaliadoSelecionado
    );
    if (!avaliado) return;

    const payload = {
      idIndicado: avaliado.idAvaliado,
      idIndicador: perfil.userId,
      idCiclo: avaliado.idCiclo,
      tipo: tipo as TipoReferencia,
      justificativa,
    };

    try {
      if (editIndex !== null) {
        const referenciaEditando = referencias[editIndex];
        if (!referenciaEditando?.id) {
          toast.error("Erro ao editar: ID da referência não encontrado.");
          return;
        }

        await atualizarReferencia(referenciaEditando.id, {
          tipo: tipo as TipoReferencia,
          justificativa,
        });

        setReferencias((prev) =>
          prev.map((r, i) =>
            i === editIndex
              ? {
                  ...r,
                  tipo,
                  justificativa,
                }
              : r
          )
        );

        toast.success("Referência atualizada com sucesso!");
      } else {
        const res = await criarReferencia(payload);

        if (!res?.idIndicacao) {
          toast.error("Erro ao salvar: ID da nova referência não retornado.");
          return;
        }

        setReferencias((prev) => [
          ...prev,
          {
            id: res?.idIndicacao,
            idAvaliado: avaliado.idAvaliado,
            nome: avaliado.nome,
            tipo,
            justificativa,
          },
        ]);

        toast.success("Referência indicada com sucesso!");
      }

      resetForm();
    } catch (err) {
      console.error("Erro ao indicar/editar referência:", err);
      toast.error("Erro ao salvar referência. Tente novamente.");
    }
  };

  const handleDelete = async (indexToDelete: number) => {
    const referencia = referencias[indexToDelete];

    if (referencia?.id) {
      try {
        const res = await deletarReferencia(referencia.id);
        toast.success("Referência removida com sucesso!");
        setReferencias((prev) => prev.filter((_, i) => i !== indexToDelete));
      } catch (err) {
        console.error("Erro ao deletar referência:", err);
        toast.error("Erro ao remover referência.");
        return;
      }
    }
  };

  const handleEdit = (index: number) => {
    const ref = referencias[index];
    setTipo(ref.tipo);
    setJustificativa(ref.justificativa);
    setEditIndex(index);

    const avaliadoCorrespondente = avaliados.find((a) => a.nome === ref.nome);
    if (avaliadoCorrespondente) {
      setIdAvaliadoSelecionado(avaliadoCorrespondente.idAvaliado);
    }

    setShowModal(true);
  };

  const referenciasTecnicas = referencias.filter(
    (r) => r.tipo === "TECNICA"
  ).length;
  const referenciasCulturais = referencias.filter(
    (r) => r.tipo === "CULTURAL"
  ).length;

  const resetForm = () => {
    setTipo(null);
    setJustificativa("");
    setShowModal(false);
    setEditIndex(null);
    setIdAvaliadoSelecionado(null);
  };

  return (
    <>
      <S.CardContainer>
        <S.Title>Indicação de Referências</S.Title>
        <S.Subtitle>
          Indique pessoas que são referências técnicas e culturais para você na
          empresa
        </S.Subtitle>
      </S.CardContainer>

      <S.CardContainer>
        <S.CardText>
          <strong>Instruções:</strong> Indique colegas da Rocket Corp que você
          considera referências em aspectos técnicos e culturais. Suas
          indicações ajudarão no processo de equalização e desenvolvimento da
          empresa.
        </S.CardText>
      </S.CardContainer>

      <S.Header>
        <S.HeaderButtons>
          <Button onClick={() => setShowModal(true)}>
            <MdAdd /> Adicionar Referência
          </Button>
        </S.HeaderButtons>
      </S.Header>

      <S.ReferTitle>
        <MdOutlineCode color={theme.colors.chart.blue} />
        Referências Técnicas <span>{referenciasTecnicas}</span>
      </S.ReferTitle>
      {referencias
        .filter((r) => r.tipo === "TECNICA")
        .map((r, i) => {
          const index = referencias.findIndex(
            (ref) => ref.nome === r.nome && ref.tipo === "TECNICA"
          );
          return (
            <S.ReferenceCard key={i}>
              <S.Avatar />
              <S.UserData>
                <strong>{r.nome}</strong>
                {/* <span>{avaliados.find((a) => a.idAvaliado === r.idAvaliado)?.cargo || "Cargo não informado"}</span> */}
                {/* <small>Trabalhou junto por x meses</small> */}
              </S.UserData>
              <S.TypeBadge $tipo="tecnica">
                <MdOutlineCode />
                Técnica
              </S.TypeBadge>
              <S.EditIcon onClick={() => handleEdit(index)}>
                <MdOutlineEdit />
              </S.EditIcon>
              <S.DeleteIcon onClick={() => handleDelete(index)}>
                <MdOutlineDelete />
              </S.DeleteIcon>
            </S.ReferenceCard>
          );
        })}

      <S.ReferSeparator></S.ReferSeparator>

      <S.ReferTitle>
        <MdOutlineGroup color={theme.colors.chart.green} />
        Referências Culturais <span>{referenciasCulturais}</span>
      </S.ReferTitle>
      {referencias
        .filter((r) => r.tipo === "CULTURAL")
        .map((r, i) => {
          const index = referencias.findIndex(
            (ref) => ref.nome === r.nome && ref.tipo === "CULTURAL"
          );
          return (
            <S.ReferenceCard key={i}>
              <S.Avatar />
              <S.UserData>
                <strong>{r.nome}</strong>
                {/* <span>{avaliados.find((a) => a.idAvaliado === r.idAvaliado)?.cargo || "Cargo não informado"}</span> */}
                {/* <small>Trabalhou junto por x meses</small> */}
              </S.UserData>
              <S.TypeBadge $tipo="cultural">
                <MdOutlineGroup />
                Cultural
              </S.TypeBadge>
              <S.EditIcon onClick={() => handleEdit(index)}>
                <MdOutlineEdit />
              </S.EditIcon>
              <S.DeleteIcon onClick={() => handleDelete(index)}>
                <MdOutlineDelete />
              </S.DeleteIcon>
            </S.ReferenceCard>
          );
        })}

      <S.CardContainer>
        <S.CardText>
          As indicações são enviadas automaticamente, remova e faça edições
          enquanto o ciclo continua na fase de Avaliação
        </S.CardText>
      </S.CardContainer>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Indicar Nova Referência"
        description="Indique uma pessoa que você considera uma referência técnica ou cultural"
        icon={<MdOutlineAdd />}
        iconColor="info"
      >
        <S.ModalContent>
          <S.ModalRow>
            <S.ModalInputGroup>
              <S.ModalText>Nome do Colaborador *</S.ModalText>
              <Select
                options={avaliados.map((a) => ({
                  label: a.nome,
                  value: a.idAvaliado,
                }))}
                value={idAvaliadoSelecionado}
                onChange={(val) => setIdAvaliadoSelecionado(val as string)}
                placeholder="Selecione um colaborador"
                disabled={editIndex !== null}
              />
            </S.ModalInputGroup>

            <S.ModalInputGroup>
              <S.ModalText>Tipo de Referência *</S.ModalText>
              <S.ReferenceTypeButtons>
                <S.ReferenceTypeButton
                  selected={tipo === "TECNICA"}
                  onClick={() => setTipo("TECNICA")}
                >
                  <MdOutlineCode size={20} />
                  Técnica
                </S.ReferenceTypeButton>
                <S.ReferenceTypeButton
                  selected={tipo === "CULTURAL"}
                  onClick={() => setTipo("CULTURAL")}
                >
                  <MdOutlineGroup size={20} />
                  Cultural
                </S.ReferenceTypeButton>
              </S.ReferenceTypeButtons>
            </S.ModalInputGroup>
          </S.ModalRow>

          <S.ModalInputGroup>
            <S.ModalText>Justificativa *</S.ModalText>
            <S.ModalTextArea
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              placeholder="Explique por que considera esta pessoa uma referência e cite exemplos específicos..."
              rows={4}
            />
          </S.ModalInputGroup>
        </S.ModalContent>

        <S.ModalButtons>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleIndicar}>
            <MdOutlineAdd />
            Indicar Referência
          </Button>
        </S.ModalButtons>
      </Modal>
    </>
  );
}
