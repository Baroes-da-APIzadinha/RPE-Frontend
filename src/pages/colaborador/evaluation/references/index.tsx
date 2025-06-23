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
import { FaPaperPlane } from "react-icons/fa";
import { Modal } from "@/components/Modal/index.tsx";
import { useState } from "react";
import Input from "@/components/Input/index.tsx";
import ButtonFrame from "@/components/ButtonFrame/index.tsx";
import { useForm } from "react-hook-form";
import theme from "@/styles/theme.ts";

type TipoReferencia = "tecnica" | "cultural";

type Referencia = {
  nome: string;
  tipo: TipoReferencia;
  justificativa: string;
};

export function ReferencesPage() {
  const { handleSubmit } = useForm();

  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoReferencia | null>(null);
  const [justificativa, setJustificativa] = useState("");
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleIndicar = () => {
    if (!nome || !tipo || !justificativa) return;

    const novaReferencia = { nome, tipo, justificativa };

    if (editIndex !== null) {
      setReferencias((prev) =>
        prev.map((r, i) => (i === editIndex ? novaReferencia : r))
      );
    } else {
      setReferencias((prev) => [...prev, novaReferencia]);
    }

    resetForm();
  };

  const handleDelete = (indexToDelete: number) => {
    setReferencias((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const resetForm = () => {
    setNome("");
    setTipo(null);
    setJustificativa("");
    setShowModal(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const ref = referencias[index];
    setNome(ref.nome);
    setTipo(ref.tipo);
    setJustificativa(ref.justificativa);
    setEditIndex(index);
    setShowModal(true);
  };

  const referenciasTecnicas = referencias.filter(
    (r) => r.tipo === "tecnica"
  ).length;
  const referenciasCulturais = referencias.filter(
    (r) => r.tipo === "cultural"
  ).length;

  const onSubmit = () => {
    const tecnicas = referencias.filter((r) => r.tipo === "tecnica");
    const culturais = referencias.filter((r) => r.tipo === "cultural");

    console.log("Referências Técnicas:", tecnicas);
    console.log("Referências Culturais:", culturais);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        .filter((r) => r.tipo === "tecnica")
        .map((r, i) => {
          const index = referencias.findIndex(
            (ref) => ref.nome === r.nome && ref.tipo === "tecnica"
          );
          return (
            <S.ReferenceCard key={i}>
              <S.Avatar />
              <S.UserData>
                <strong>{r.nome}</strong>
                <span>Desenvolvedor backend</span>
                <small>Trabalhou junto por x meses</small>
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
        .filter((r) => r.tipo === "cultural")
        .map((r, i) => {
          const index = referencias.findIndex(
            (ref) => ref.nome === r.nome && ref.tipo === "cultural"
          );
          return (
            <S.ReferenceCard key={i}>
              <S.Avatar />
              <S.UserData>
                <strong>{r.nome}</strong>
                <span>Desenvolvedor backend</span>
                <small>Trabalhou junto por x meses</small>
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

      <ButtonFrame text="Para submeter suas indicações, clique em enviar.">
        <Button onClick={handleSubmit(onSubmit)}>
          <FaPaperPlane />
          Enviar
        </Button>
      </ButtonFrame>

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
              <Input
                placeholder="Digite o nome completo..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </S.ModalInputGroup>

            <S.ModalInputGroup>
              <S.ModalText>Tipo de Referência *</S.ModalText>
              <S.ReferenceTypeButtons>
                <S.ReferenceTypeButton
                  selected={tipo === "tecnica"}
                  onClick={() => setTipo("tecnica")}
                >
                  <MdOutlineCode size={20} />
                  Técnica
                </S.ReferenceTypeButton>
                <S.ReferenceTypeButton
                  selected={tipo === "cultural"}
                  onClick={() => setTipo("cultural")}
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
          <Button onClick={handleIndicar}>
            <MdOutlineAdd />
            Indicar Referência
          </Button>
        </S.ModalButtons>
      </Modal>
    </form>
  );
}
