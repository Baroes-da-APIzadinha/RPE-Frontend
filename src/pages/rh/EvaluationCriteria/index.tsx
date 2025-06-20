import Button from "@/components/Button";
import { Sidebar } from "@/components/Sidebar";
import { Title } from "@/components/Title";
import * as S from "./styles.ts";
import {
  MdAdd,
  MdAssignment,
  MdFileDownload,
} from "react-icons/md";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import Input from "@/components/Input";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/CheckBox/index.tsx";
import { Card } from "@/components/Card/index.tsx";
import { ToggleBar } from "@/components/ToggleBar/index.tsx";
import { criteriosIniciais } from "@/data/crietrios.ts";
import type { Criterio } from "@/types/Criterio";
import { DropdownActions } from "@/components/DropdownActions/index.tsx";

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
    if (!nome || !descricao || !categoria || !peso || trilhas.length === 0) {
      alert("Preencha todos os campos para adicionar o critério.");
      return;
    }

    const novoCriterio = {
      nome,
      descricao,
      categoria,
      peso,
      trilhas,
    };

    setCriterios((prev) => [...prev, novoCriterio]);
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setNome("");
    setDescricao("");
    setCategoria(null);
    setPeso(null);
    setTrilhas([]);
  };

  const criteriosFiltrados = criterios.filter(
    (criterio) => criterio.categoria === tipo
  );

  // Lógica da página de gerenciamento de critérios

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
              <Button variant="outline">
                <MdFileDownload /> Exportar
              </Button>
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
              {/* <S.HeaderButtons>
                <Button variant="outline">
                  <MdSettings /> Configurações
                </Button>
                <Button variant="outline">
                  <MdDisplaySettings /> Pesos
                </Button>
              </S.HeaderButtons> */}
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
                    <td>{criterio.peso}</td>
                    <td>
                      <DropdownActions
                        onEditar={() => console.log("editar")}
                        onAjustarPeso={() => console.log("ajustar")}
                        onDesativar={() => console.log("desativar")}
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
          onClose={() => setShowModal(false)}
          title="Adicionar Novo Critério"
          description="Defina um novo critério de avaliação"
        >
          <S.ModalContent>
            <div>
              <S.ModalText>Nome do critério:</S.ModalText>
              <Input
                placeholder="Ex: Comunicação Efetiva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <S.ModalText>Descrição:</S.ModalText>
              <Input
                placeholder="Descreva o que será avaliado neste critério..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                as="textarea"
                rows={4}
              />
            </div>

            <S.ModalSelectsRow>
              <S.ModalSelect>
                <S.ModalText>Categoria:</S.ModalText>
                <Select
                  placeholder="Selecione a categoria"
                  value={categoria}
                  onChange={setCategoria}
                  options={categorias}
                />
              </S.ModalSelect>
              <S.ModalSelect>
                <S.ModalText>Peso:</S.ModalText>
                <Select
                  placeholder="Selecione o peso"
                  value={peso}
                  onChange={setPeso}
                  options={pesos}
                />
              </S.ModalSelect>
            </S.ModalSelectsRow>

            <div>
              <S.ModalText>Aplicável às Trilhas</S.ModalText>
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
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>Adicionar</Button>
            </S.ModalButtons>
          </S.ModalContent>
        </Modal>
      </S.Wrapper>
    </>
  );
}
