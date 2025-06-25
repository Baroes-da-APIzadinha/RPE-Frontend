import { useState } from "react";
import * as S from "./styles.ts";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Select } from "@/components/Select";
import { Modal } from "@/components/Modal";
import { Sidebar } from "@/components/Sidebar";
import { Title } from "@/components/Title";
import { MdAdd, MdAssignment, MdFileDownload } from "react-icons/md";
import { Checkbox } from "@/components/CheckBox/index.tsx";
import { Card } from "@/components/Card/index.tsx";
import { ToggleBar } from "@/components/ToggleBar/index.tsx";
import { DropdownActions } from "@/components/DropdownActions/index.tsx";
import { criteriosIniciais } from "@/data/crietrios.ts";
import type { Criterio } from "@/types/Criterio";
import { toast } from "sonner";
import theme from "@/styles/theme.ts";

type TipoCriterio = "comportamento" | "execucao" | "gestao";

export function EvaluationCriteria() {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [peso, setPeso] = useState<string | null>(null);
  const [trilhas, setTrilhas] = useState<string[]>([]);
  const [tipo, setTipo] = useState<TipoCriterio>("comportamento");
  const [criterios, setCriterios] = useState<Criterio[]>(criteriosIniciais);
  const [criterioEditando, setCriterioEditando] = useState<Criterio | null>(
    null
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [pesoEditandoIndex, setPesoEditandoIndex] = useState<number | null>(
    null
  );
  const [camposErro, setCamposErro] = useState({
    nome: false,
    descricao: false,
    categoria: false,
    peso: false,
    trilhas: false,
  });

  // Configurações para o formulário de adição de critério
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

  const trilhasDisponiveis = [
    "Tecnologia",
    "Design",
    "Gestão",
    "Produto",
    "Dados",
    "Liderança",
  ];

  const toggleTrilha = (trilha: string) => {
    setTrilhas((prev) =>
      prev.includes(trilha)
        ? prev.filter((t) => t !== trilha)
        : [...prev, trilha]
    );
  };

  const handleSubmit = () => {
    const camposInvalidos = {
      nome: !nome.trim(),
      descricao: !descricao.trim(),
      categoria: !categoria,
      peso: !peso,
      trilhas: trilhas.length === 0,
    };

    if (Object.values(camposInvalidos).some((v) => v)) {
      toast.error(
        "Preencha todos os campos obrigatórios para adicionar o critério."
      );
      setCamposErro(camposInvalidos);
      return;
    }

    const novoCriterio: Criterio = {
      nome,
      descricao,
      categoria: categoria as TipoCriterio,
      peso: peso as string,
      trilhas,
    };

    setCriterios((prev) => [...prev, novoCriterio]);
    resetForm();
    setShowModal(false);
    toast.success("Critério criado com sucesso!");
  };

  const resetForm = () => {
    setNome("");
    setDescricao("");
    setCategoria(null);
    setPeso(null);
    setTrilhas([]);
    setCamposErro({
      nome: false,
      descricao: false,
      categoria: false,
      peso: false,
      trilhas: false,
    });
  };

  const criteriosFiltrados = criterios.filter(
    (criterio) => criterio.categoria === tipo
  );

  // Lógica da página de gerenciamento de critérios

  const handleEdit = (criterio: Criterio, index: number) => {
    setCriterioEditando(criterio);
    setEditIndex(index);
    setNome(criterio.nome);
    setDescricao(criterio.descricao);
    setCategoria(criterio.categoria);
    setPeso(criterio.peso);
    setTrilhas(criterio.trilhas);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const novos = [...criterios];
      novos[editIndex] = {
        nome,
        descricao,
        categoria: categoria as TipoCriterio,
        peso: peso as string,
        trilhas,
      };
      setCriterios(novos);
      setEditIndex(null);
      setCriterioEditando(null);
      resetForm();
      setShowModal(false);
      toast.success("Critério atualizado com sucesso!");

    }
  };

  const handlePesoChange = (index: number, novoPeso: string) => {
    const novos = [...criterios];
    novos[index] = { ...novos[index], peso: novoPeso };
    setCriterios(novos);
    setPesoEditandoIndex(null);
  };

  return (
    <>
      <S.Wrapper>
        <Sidebar
          roles={["colaborador", "gestor", "rh", "comite"]}
          mainRole="comite"
          userName="João Gomes"
        />
        <S.Main>
          <S.Header>
            <Title>Gerenciamento de Critérios</Title>
            <S.HeaderButtons>
              {/* <Button variant="outline">
                <MdFileDownload /> Exportar
              </Button> */}
              <Button onClick={() => setShowModal(true)}>
                <MdAdd /> Adicionar Critério
              </Button>
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
              onChange={(value) => setTipo(value as TipoCriterio)}
              items={[
                {
                  value: "comportamento",
                  label: "Comportamento",
                  icon: <MdAssignment />,
                },
                {
                  value: "execucao",
                  label: "Execução",
                  icon: <MdAssignment />,
                },
                {
                  value: "gestao",
                  label: "Gestão e Liderança",
                  icon: <MdAssignment />,
                },
              ]}
            />

            <S.Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Trilhas</th>
                  <th>Peso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {criteriosFiltrados.map((criterio, index) => (
                  <tr key={index}>
                    <td>{criterio.nome}</td>
                    <td>{criterio.descricao}</td>
                    <td>
                      <S.Badge>
                        {criterio.trilhas.length === 6
                          ? "Todas"
                          : criterio.trilhas.join(", ")}
                      </S.Badge>
                    </td>
                    <td>
                      {pesoEditandoIndex === index ? (
                        <Select
                          options={pesos}
                          value={criterio.peso}
                          onChange={(novoPeso) =>
                            handlePesoChange(index, novoPeso)
                          }
                        />
                      ) : (
                        <span>{criterio.peso}</span>
                      )}
                    </td>
                    <td>
                      <DropdownActions
                        actions={[
                          {
                            label: "Editar",
                            onClick: () => handleEdit(criterio, index),
                          },
                          {
                            label: "Ajustar peso",
                            onClick: () => setPesoEditandoIndex(index),
                          },
                          {
                            label: "Desativar",
                            onClick: () => {
                              /* ação de desativar */
                            },
                            danger: true,
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </Card>
        </S.Main>

        <Modal
          open={showModal}
          onClose={() => {
            resetForm();
            setShowModal(false);
            setEditIndex(null);
            setCriterioEditando(null);
          }}
          title={
            editIndex !== null ? "Editar Critério" : "Adicionar Novo Critério"
          }
          description={
            editIndex !== null
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
                style={
                  camposErro.nome
                    ? { borderColor: theme.colors.error.default }
                    : {}
                }
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

            <div>
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
            </div>

            <S.ModalButtons>
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                  setEditIndex(null);
                  setCriterioEditando(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={editIndex !== null ? handleSaveEdit : handleSubmit}
              >
                {editIndex !== null ? "Salvar" : "Adicionar"}
              </Button>
            </S.ModalButtons>
          </S.ModalContent>
        </Modal>
      </S.Wrapper>
    </>
  );
}
