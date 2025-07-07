import styled from "styled-components";

export const TimelineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
`;

export const Step = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;

  .circle {
    width: 3rem; /* Aumenta o tamanho da bola */
    height: 3rem; /* Aumenta o tamanho da bola */
    border-radius: 50%;
    border: ${({ completed, active, theme }) =>
      completed || active ? "none" : `2px solid ${theme.colors.text.secondary}`}; /* Remove a borda quando ativa */
    background: ${({ active, completed, theme }) => {
      if (completed) return theme.colors.success.default;
      if (active) return theme.colors.primary.default;
      return theme.colors.surface.default;
    }};
  }

  .label {
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ active, theme }) =>
      active ? theme.font.semibold : theme.font.normal};
    text-align: center;
  }
`;

export const Line = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 -3.8rem; /* Adds spacing between the circles and the line */
  z-index: 0;
  margin-top: -2rem;
`;