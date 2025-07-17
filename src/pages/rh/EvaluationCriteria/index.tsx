import { useState, useEffect } from "react";
import * as S from "./styles.ts";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Select } from "@/components/Select";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { MdAdd, MdAssignment } from "react-icons/md";
import { Card } from "@/components/Card/index.tsx";
import { ToggleBar } from "@/components/ToggleBar/index.tsx";
import { DropdownActions } from "@/components/DropdownActions/index.tsx";
import { toast } from "sonner";
import theme from "@/styles/theme.ts";
import { useCriterios } from "@/hooks/useCriterios";
import type { Criterio } from "@/services/HTTP/criterio.ts";

export function EvaluationCriteria() {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [peso, setPeso] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [tipo, setTipo] = useState("comportamento");
  const [camposErro, setCamposErro] = useState({
    nome: false,
    descricao: false,
    categoria: false,
    peso: false,
  });
  const [criterioParaRemover, setCriterioParaRemover] = useState<{
    id: string;
    nome: string;
    pilar: string;
  } | null>(null);

  const {
    criterios,
    fetchAllPilares,
    adicionarCriterio,
    editarCriterio,
    removerCriterio,
  } = useCriterios();

  useEffect(() => {
    fetchAllPilares();
  }, [fetchAllPilares]);

  const pilaresMap: Record<string, keyof typeof criterios> = {
    comportamento: "Comportamento",
    execucao: "Execucao",
    gestao: "Gestao_e_Lideranca",
  };

  const criteriosFiltrados = criterios[pilaresMap[tipo]] || [];

  const categorias = [
    { label: "Comportamento", value: "comportamento" },
    { label: "Execução", value: "execucao" },
    { label: "Gestão e Liderança", value: "gestao" },
  ];

  const pesos = [
    { label: "0.5", value: "0.5" },
    { label: "1.0 (Padrão)", value: "1.0" },
    { label: "1.5", value: "1.5" },
    { label: "2.0", value: "2.0" },
  ];

  const resetForm = () => {
    setNome("");
    setDescricao("");
    setCategoria(null);
    setPeso(null);
    setEditId(null);
    setCamposErro({
      nome: false,
      descricao: false,
      categoria: false,
      peso: false,
    });
  };

  const handleSubmit = async () => {
    const camposInvalidos = {
      nome: !nome.trim(),
      descricao: !descricao.trim(),
      categoria: !categoria,
      peso: !peso,
    };

    if (Object.values(camposInvalidos).some((v) => v)) {
      toast.error(
        "Preencha todos os campos obrigatórios para adicionar o critério."
      );
      setCamposErro(camposInvalidos);
      return;
    }

    try {
      await adicionarCriterio({
        nomeCriterio: nome,
        descricao,
        pilar: pilaresMap[categoria!],
        peso: peso!,
        obrigatorio: true,
      });
      toast.success("Critério criado com sucesso!");
      resetForm();
      setShowModal(false);
    } catch {
      toast.error("Erro ao criar critério");
    }
  };

  const handleEdit = (criterio: Criterio) => {
    setEditId(criterio.idCriterio);
    setNome(criterio.nomeCriterio);
    setDescricao(criterio.descricao);
    setCategoria(
      criterio.pilar === "Gestao_e_Lideranca"
        ? "gestao"
        : criterio.pilar.toLowerCase()
    );
    setPeso(Number(criterio.peso).toFixed(1));
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editId) return;

    const camposInvalidos = {
      nome: !nome.trim(),
      descricao: !descricao.trim(),
      categoria: !categoria,
      peso: !peso,
    };

    if (Object.values(camposInvalidos).some((v) => v)) {
      toast.error("Preencha todos os campos obrigatórios para salvar.");
      setCamposErro(camposInvalidos);
      return;
    }

    try {
      await editarCriterio(editId, {
        nomeCriterio: nome,
        descricao,
        pilar: pilaresMap[categoria!],
        peso: peso!,
        obrigatorio: true,
      });

      toast.success("Critério editado com sucesso!");
      resetForm();
      setShowModal(false);
    } catch {
      toast.error("Erro ao editar critério");
    }
  };

  return (
    <>
      <>
        <S.Header>
          <Title>Gerenciamento de Critérios</Title>
          <S.HeaderButtons>
            <S.DesktopButtons>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <MdAdd /> Adicionar Critério
              </Button>
            </S.DesktopButtons>
            <S.MobileActions>
              <DropdownActions
                title="Opções"
                orientation="vertical"
                position="bottom"
                actions={[
                  {
                    label: "Adicionar Critério",
                    onClick: () => setShowModal(true),
                    icon: <MdAdd />,
                  },
                ]}
              />
            </S.MobileActions>
          </S.HeaderButtons>
        </S.Header>

        <Card>
          <S.Header>
            <div>
              <S.Title>Critérios de Avaliação</S.Title>
              <S.Subtitle>
                Gerencie os critérios utilizados nas avaliações
              </S.Subtitle>
            </div>
          </S.Header>

          <ToggleBar
            value={tipo}
            onChange={(value) => setTipo(value as any)}
            items={categorias.map(({ value, label }) => ({
              value,
              label,
              icon: <MdAssignment />,
            }))}
          />

          <div>
            <S.Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Peso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {criteriosFiltrados.map((criterio) => (
                  <tr key={criterio.idCriterio}>
                    <td>{criterio.nomeCriterio}</td>
                    <td>{criterio.descricao}</td>
                    <td>{Number(criterio.peso).toFixed(1)}</td>
                    <td>
                      <DropdownActions
                        actions={[
                          {
                            label: "Editar",
                            onClick: () => handleEdit(criterio),
                          },
                          {
                            label: "Remover",
                            onClick: () =>
                              setCriterioParaRemover({
                                id: criterio.idCriterio,
                                nome: criterio.nomeCriterio,
                                pilar: criterio.pilar,
                              }),
                            danger: true,
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </div>
        </Card>
      </>

      <Modal
        open={showModal}
        onClose={() => {
          resetForm();
          setShowModal(false);
        }}
        title={editId ? "Editar Critério" : "Adicionar Novo Critério"}
        description={
          editId
            ? "Modifique as informações do critério"
            : "Defina um novo critério de avaliação"
        }
      >
        <S.ModalContent>
          <div>
            <S.ModalText>Nome do critério:*</S.ModalText>
            <Input
              placeholder="Ex: Comunicação Efetiva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={camposErro.nome}
            />
          </div>

          <div>
            <S.ModalText>Descrição:*</S.ModalText>
            <S.ModalTextArea
              placeholder="Descreva o que será avaliado neste critério..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              style={
                camposErro.descricao
                  ? { borderColor: theme.colors.error.default }
                  : {}
              }
            />
          </div>

          <S.ModalSelectsRow>
            <S.ModalSelect>
              <S.ModalText>Categoria:*</S.ModalText>
              <Select
                placeholder="Selecione a categoria"
                value={categoria}
                onChange={setCategoria}
                options={categorias}
                error={camposErro.categoria}
              />
            </S.ModalSelect>
            <S.ModalSelect>
              <S.ModalText>Peso:*</S.ModalText>
              <Select
                placeholder="Selecione o peso"
                value={peso}
                onChange={setPeso}
                options={pesos}
                error={camposErro.peso}
              />
            </S.ModalSelect>
          </S.ModalSelectsRow>

          {/* <div>
              <S.ModalText>Aplicável às Trilhas</S.ModalText>
              <S.ModalSubText>Selecione no mínimo 1 opção.</S.ModalSubText>
              <S.ModalCheckbox>
                {trilhasDisponiveis.map((trilha) => (
                  <Checkbox
                    key={trilha}
                    label={trilha}
                    checked={trilhas.includes(trilha)}
                    onChange={() => toggleTrilha(trilha)}
                  />
                ))}
                <Checkbox
                  label="Todas as trilhas"
                  checked={trilhas.length === trilhasDisponiveis.length}
                  onChange={() =>
                    setTrilhas((prev) =>
                      prev.length === trilhasDisponiveis.length
                        ? []
                        : trilhasDisponiveis
                    )
                  }
                />
              </S.ModalCheckbox>
            </div> */}

          <S.ModalButtons>
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={editId ? handleSaveEdit : handleSubmit}>
              {editId ? "Salvar" : "Adicionar"}
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>

      <Modal
        open={!!criterioParaRemover}
        onClose={() => setCriterioParaRemover(null)}
        title="Remover critério?"
        description={`Tem certeza que deseja remover "${criterioParaRemover?.nome}"?\nEssa ação não poderá ser desfeita.`}
      >
        <S.ModalButtons>
          <Button
            variant="outline"
            onClick={() => setCriterioParaRemover(null)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (criterioParaRemover) {
                removerCriterio(
                  criterioParaRemover.id,
                  pilaresMap[
                    criterioParaRemover.pilar === "Gestao_e_Lideranca"
                      ? "gestao"
                      : criterioParaRemover.pilar.toLowerCase()
                  ]
                );
                setCriterioParaRemover(null);
              }
            }}
          >
            Confirmar
          </Button>
        </S.ModalButtons>
      </Modal>
    </>
  );
}
