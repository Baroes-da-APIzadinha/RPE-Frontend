import * as S from "./styles.ts";
import { Sidebar } from "@/components/Sidebar/index.tsx";
import { Title } from "./styles.ts";
import { Card } from "@/components/Card/index.tsx";
import Button from "@/components/Button";
import { MdFileDownload } from "react-icons/md";
import { useState } from "react";
import { Modal } from "@/components/Modal/index.tsx";
import { LuTriangleAlert } from "react-icons/lu";

export function CycleHistory() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);

  const ciclos = [
    {
      id: 1,
      nome: "2025.1",
      status: "em andamento",
      data: "termina em 12 dias",
      cor: "#F5A623",
    },
    {
      id: 2,
      nome: "2024.2",
      status: "concluída",
      data: "Encerrada em 25/12/2024",
      cor: "#9B9B9B",
    },
  ];

  return (
    <S.Wrapper>
      <Sidebar
        roles={["colaborador", "gestor", "rh", "comite"]}
        mainRole="comite"
        userName="João Gomes"
      />
      <S.Main>
        <S.Header>
          <Title>Histórico de Avaliações</Title>
        </S.Header>

        <Card>
          {ciclos.map((ciclo) => (
            <S.CycleCard key={ciclo.id}>
              <S.CycleInfo>
                <S.CycleAvatar style={{ backgroundColor: ciclo.cor }} />
                <div>
                  <strong>{ciclo.nome}</strong>
                  <p>{ciclo.data}</p>
                </div>
              </S.CycleInfo>

              <S.CycleActions>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (ciclo.status === "em andamento") {
                      setSelectedCycle(ciclo.nome);
                      setShowExportModal(true);
                    } else {
                      console.log(`Exportando ciclo ${ciclo.nome}...`);
                    }
                  }}
                >
                  <MdFileDownload /> Exportar
                </Button>
                <S.StatusTag $status={ciclo.status}>{ciclo.status}</S.StatusTag>
              </S.CycleActions>
            </S.CycleCard>
          ))}
        </Card>
      </S.Main>
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Ciclo de Avaliação Incompleto"
        icon={<LuTriangleAlert />}
        iconColor="warning"
      >
        <S.ModalContent>
          <S.ModalDiv>
            <S.Subtitle>
              O ciclo de avaliação atual ainda não foi finalizado. Os dados
              podem estar incompletos ou conter informações provisórias.
            </S.Subtitle>

            <S.ModalAlert>Deseja exportar os dados mesmo assim?</S.ModalAlert>
          </S.ModalDiv>
          <S.ModalButtons>
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                console.log(
                  `Exportando ciclo ${selectedCycle} mesmo incompleto...`
                );
                setShowExportModal(false);
              }}
            >
              <MdFileDownload /> Exportar Mesmo Assim
            </Button>
          </S.ModalButtons>
        </S.ModalContent>
      </Modal>
    </S.Wrapper>
  );
}
