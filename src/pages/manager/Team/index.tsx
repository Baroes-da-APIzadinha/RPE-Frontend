import * as S from "./styles.ts";
import { Title } from "@/components/Title/index.tsx";
import { Sidebar } from "@/components/Sidebar/index.tsx";
import { Card } from "@/components/Card/index.tsx";
import Button from "@/components/Button/index.tsx";
import { SearchInput } from "@/components/SearchInput/index.tsx";
import {
  MdArrowDropDown,
  MdOutlineHistory,
  MdOutlineModeEdit,
} from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Status = "concluida" | "andamento" | "pendente";

type Colaborador = {
  nome: string;
  cargo: string;
  desde: string;
  tempoEquipe: string;
  autoavaliacao: number | null;
  notaGestor: number | null;
  statusAvaliacoes: {
    autoavaliacao: Status;
    avaliacao360: Status;
  };
  pontosFortes: string[];
  pontosAtencao: string[];
};

const equipeMock: Colaborador[] = [
  {
    nome: "João Silva",
    cargo: "Desenvolvedor Backend Sênior",
    desde: "2022-03-15",
    tempoEquipe: "2 anos e 3 meses",
    autoavaliacao: 4.3,
    notaGestor: 4.0,
    statusAvaliacoes: {
      autoavaliacao: "concluida",
      avaliacao360: "concluida",
    },
    pontosFortes: ["Organização", "Mentoria"],
    pontosAtencao: ["Comunicação", "Pontualidade"],
  },
  {
    nome: "Ana Costa",
    cargo: "Product Owner",
    desde: "2023-01-10",
    tempoEquipe: "1 ano e 5 meses",
    autoavaliacao: 4.1,
    notaGestor: null,
    statusAvaliacoes: {
      autoavaliacao: "concluida",
      avaliacao360: "andamento",
    },
    pontosFortes: ["Trabalho em equipe", "Adaptabilidade"],
    pontosAtencao: ["Negociação"],
  },
  {
    nome: "Pedro Santos",
    cargo: "Desenvolvedor Backend Júnior",
    desde: "2023-08-01",
    tempoEquipe: "10 meses",
    autoavaliacao: null,
    notaGestor: null,
    statusAvaliacoes: {
      autoavaliacao: "andamento",
      avaliacao360: "pendente",
    },
    pontosFortes: ["Vontade de aprender", "Dedicação"],
    pontosAtencao: ["Organização"],
  },
  {
    nome: "Carla Mendes",
    cargo: "QA Analyst",
    desde: "2022-09-20",
    tempoEquipe: "1 ano e 9 meses",
    autoavaliacao: null,
    notaGestor: null,
    statusAvaliacoes: {
      autoavaliacao: "pendente",
      avaliacao360: "pendente",
    },
    pontosFortes: [
      "Organização",
      "Atenção aos detalhes",
      "Comunicação",
      "Proatividade",
      "Resiliência",
    ],
    pontosAtencao: ["Iniciativa", "Cumprimento de prazos"],
  },
];

export function ManagerTeam() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };
  return (
    <S.Wrapper>
      <Sidebar
        roles={["colaborador", "gestor", "rh", "comite"]}
        mainRole="gestor"
        userName="João Gomes"
      />
      <S.Main>
        <S.Header>
          <Title>Minha Equipe</Title>
          <SearchInput placeholder="Buscar membro da equipe..." />
        </S.Header>

        <Card>
        {equipeMock.map((colab, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <S.CardContainer key={index}>
              <S.UserHeader>
                <S.UserInfo>
                  <S.Avatar />
                  <div>
                    <S.Name>{colab.nome}</S.Name>
                    <S.Role>{colab.cargo}</S.Role>
                    <S.Since>Trabalha com você há {colab.tempoEquipe}</S.Since>
                  </div>
                </S.UserInfo>
                <S.UserActions>
                  <S.ScoreContainer>
                    <S.ScoreLabel>Autoavaliação</S.ScoreLabel>
                    <S.ScoreValue>{colab.autoavaliacao ?? "-"}</S.ScoreValue>
                  </S.ScoreContainer>
                  <S.ScoreContainer>
                    <S.ScoreLabel>Nota gestor</S.ScoreLabel>
                    <S.ScoreValue>{colab.notaGestor ?? "-"}</S.ScoreValue>
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
                      <S.Label>Status das Avaliações</S.Label>
                      <S.StatusLine>
                        <S.StatusLabel>Autoavaliação:</S.StatusLabel>
                        <S.Badge $status={colab.statusAvaliacoes.autoavaliacao}>
                          {colab.statusAvaliacoes.autoavaliacao}
                        </S.Badge>
                      </S.StatusLine>
                      <S.StatusLine>
                        <S.StatusLabel>Avaliação 360°:</S.StatusLabel>
                        <S.Badge $status={colab.statusAvaliacoes.avaliacao360}>
                          {colab.statusAvaliacoes.avaliacao360}
                        </S.Badge>
                      </S.StatusLine>
                    </div>
                    <div>
                      <S.Label>Pontos Fortes</S.Label>
                      <S.TagList>
                        {colab.pontosFortes.map((ponto, i) => (
                          <S.Tag key={i}>{ponto}</S.Tag>
                        ))}
                      </S.TagList>
                    </div>
                    <div>
                      <S.Label>Pontos de atenção</S.Label>
                      <S.TagList>
                        {colab.pontosAtencao.map((ponto, i) => (
                          <S.Tag key={i}>{ponto}</S.Tag>
                        ))}
                      </S.TagList>
                    </div>
                  </S.InfoGrid>
                  <S.FooterButtons>
                    <Button
                      variant="outline"
                      onClick={() => console.log("Editar Avaliação")}
                    >
                      <MdOutlineHistory />
                      Histórico
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/gestor/collaborator/review")}
                    >
                      <MdOutlineModeEdit />
                      Editar Avaliação
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
