import styled from "styled-components";

const statusColors = {
  "Em andamento": (theme: any) => theme.colors.secondary.default,
  "Concluida": (theme: any) => theme.colors.success.default,
  "Pendente": (theme: any) => theme.colors.error.default,
};

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-width: 340px;
  min-height: 120px;
  position: relative;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  margin-bottom: 1.2rem;
`;

export const StatusRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  justify-content: flex-start;
`;

export const StatusSpan = styled.span<{ $status: "Em andamento" | "Concluida" | "Pendente" }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: ${({ theme, $status }) => statusColors[$status](theme) + '22'};
  border-radius: 2rem;
  padding: 0.4rem 1.2rem 0.4rem 0.7rem;
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 500;
`;

export const Circle = styled.span<{ $status: "Em andamento" | "Concluida" | "Pendente" }>`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${({ theme, $status }) => statusColors[$status](theme)};
  display: inline-block;
`;
