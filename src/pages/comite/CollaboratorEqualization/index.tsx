import { Sidebar } from "@/components/Sidebar";
import * as S from "./styles";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";
import { SearchInput } from "@/components/SearchInput";
import { useState } from "react";
import { MdArrowDropDown, MdOutlineCheckCircleOutline } from "react-icons/md";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import { IoSparklesOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Select } from "@/components/Select";

type Status = "concluida" | "andamento" | "pendente";

type Colaborador = {
  nome: string;
  cargo: string;
  desde: string;
  autoavaliacao: number | null;
  avaliacao360: number | null;
  discrepancy: number | null;
  notaGestor: number | null;
  equalization: Status;
};

const collaboratorsMock: Colaborador[] = [
  {
    nome: "João Silva",
    cargo: "Desenvolvedor Backend Sênior",
    desde: "2022-03-15",
    autoavaliacao: 4.3,
    avaliacao360: 3.2,
    discrepancy: 0.6,
    notaGestor: 4.0,
    equalization: "pendente",
  },
  {
    nome: "Ana Costa",
    cargo: "Product Owner",
    desde: "2023-01-10",
    autoavaliacao: 4.1,
    avaliacao360: 3.2,
    discrepancy: 1.6,
    notaGestor: null,
    equalization: "pendente",
  },
  {
    nome: "Pedro Santos",
    cargo: "Desenvolvedor Backend Júnior",
    desde: "2023-08-01",
    autoavaliacao: null,
    avaliacao360: 3.2,
    discrepancy: 0.7,
    notaGestor: null,
    equalization: "pendente",
  },
  {
    nome: "Carla Mendes",
    cargo: "QA Analyst",
    desde: "2022-09-20",
    autoavaliacao: null,
    avaliacao360: 3.2,
    discrepancy: 0.1,
    notaGestor: null,
    equalization: "pendente",
  },
];

export function CollaboratorEqualization() {
  const [notas, setNotas] = useState<Record<number, number>>({});
  const [hover, setHover] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [justifications, setJustifications] = useState<Record<number, string>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredCollaborators = collaboratorsMock.filter((colab) => {
    const matchesSearch = `${colab.nome} ${colab.cargo}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || colab.equalization === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <S.Wrapper>
      <Sidebar
        roles={["colaborador", "gestor", "rh", "comite"]}
        mainRole="comite"
        userName="João Gomes"
      />

      <S.Main>
        <S.Header>
          <Title>Equalização de Avaliações</Title>
        </S.Header>

        <Card>
          <S.Title>Filtros</S.Title>
          <S.FiltersWrapper>
            <S.FilterItem>
              <label>Buscar por nome ou cargo</label>
              <SearchInput
                placeholder="Buscar colaborador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </S.FilterItem>

            <S.FilterItem>
              <label>Status da equalização</label>
              <Select
                placeholder="Todos os status"
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                options={[
                  { label: "Todos", value: "todos" },
                  { label: "Pendente", value: "pendente" },
                  { label: "Andamento", value: "andamento" },
                  { label: "Concluída", value: "concluida" },
                ]}
              />
            </S.FilterItem>
          </S.FiltersWrapper>
        </Card>

        <Card>
          {filteredCollaborators.map((colab, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <S.CardContainer key={index}>
                <S.UserHeader>
                  <S.UserInfo>
                    <S.Avatar />
                    <div>
                      <S.Name>
                        {colab.nome}
                        <S.EqualizationBadge $status={colab.equalization}>
                          {colab.equalization}
                        </S.EqualizationBadge>
                      </S.Name>
                      <S.Role>{colab.cargo}</S.Role>
                    </div>
                  </S.UserInfo>
                  <S.UserActions>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Autoavaliação</S.ScoreLabel>
                      <S.ScoreValue>{colab.autoavaliacao ?? "-"}</S.ScoreValue>
                    </S.ScoreContainer>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Avaliação 360</S.ScoreLabel>
                      <S.ScoreValue>{colab.avaliacao360 ?? "-"}</S.ScoreValue>
                    </S.ScoreContainer>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Nota gestor</S.ScoreLabel>
                      <S.ScoreValue>{colab.notaGestor ?? "-"}</S.ScoreValue>
                    </S.ScoreContainer>
                    <S.ScoreContainer>
                      <S.ScoreLabel>Discrepância</S.ScoreLabel>
                      <S.DiscrepancyValue $value={colab.discrepancy}>
                        {colab.discrepancy ?? "-"}
                      </S.DiscrepancyValue>
                    </S.ScoreContainer>

                    <S.DropButton onClick={() => toggleExpand(index)}>
                      <MdArrowDropDown
                        size={36}
                        style={{
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </S.DropButton>
                  </S.UserActions>
                </S.UserHeader>

                {isExpanded && (
                  <S.InfoWrapper>
                    <S.InfoGrid>
                      <div>
                        <S.Label>Resumo IA</S.Label>
                        <S.SummaryBox>
                          <S.IconSpan>
                            <IoSparklesOutline size={24} />
                          </S.IconSpan>
                          <S.SummaryContent>
                            <strong>Resumo</strong>
                            <span>Aguarde o resumo gerado pela IA...</span>
                          </S.SummaryContent>
                        </S.SummaryBox>
                      </div>
                    </S.InfoGrid>

                    <S.Label>Avaliação Final do Comitê</S.Label>
                    <S.InfoGrid>
                      <S.RatingRow>
                        <S.Label>Nota:</S.Label>
                        {[1.0, 2.0, 3.0, 4.0, 5.0].map((star) => (
                          <S.StarButton
                            key={star}
                            onClick={() =>
                              setNotas({ ...notas, [index]: star })
                            }
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(null)}
                            $active={star <= (hover ?? notas[index] ?? 0)}
                            aria-label={`Dar nota ${star}`}
                          >
                            <FaStar />
                          </S.StarButton>
                        ))}
                        <S.Score>{notas[index] ?? 0}</S.Score>
                      </S.RatingRow>
                      <Textarea
                        placeholder="Descreva os motivos para a decisão do comitê…"
                        value={justifications[index] ?? ""}
                        onChange={(e) =>
                          setJustifications({
                            ...justifications,
                            [index]: e.target.value,
                          })
                        }
                      />
                    </S.InfoGrid>

                    <S.FooterButtons>
                      <Button
                        variant="outline"
                        onClick={() => console.log("Revisando")}
                      >
                        Revisar
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => console.log("Aprovado")}
                      >
                        <MdOutlineCheckCircleOutline /> Aprovar
                      </Button>
                    </S.FooterButtons>
                  </S.InfoWrapper>
                )}
              </S.CardContainer>
            );
          })}
        </Card>
      </S.Main>
    </S.Wrapper>
  );
}
