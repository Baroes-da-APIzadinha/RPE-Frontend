import styled from "styled-components";
import theme from "@/styles/theme";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 24px;
  background-color:  ${theme.colors.background};
`;

// export const CriteriaList = styled(EvaluationFrame)`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

export const CriteriaContent = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CriteriaSection = styled.div`
  flex: 1;
  min-width: 260px;
  background: ${theme.colors.surface.default};
  border-radius: 8px;
  padding: 20px 20px 24px 20px;
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.span`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.secondary};
  margin-bottom: .5rem;
`;

export const Button = styled.button`
  background-color: ${theme.colors.primary.default};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s;
  margin-top: 32px;
  &:hover {
    background-color: ${theme.colors.primary.hover};
  }
`;

export const CriterioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem;
  padding-bottom: 0;
  background: ${theme.colors.surface.default};
  transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ToggleIcon = styled.span<{ $open: boolean }>`
  margin-left: 12px;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const NotaBadge = styled.span<{ $visible?: boolean }>`
  display: ${({ $visible }) => ($visible === false ? 'none' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  background: ${theme.colors.primary.light};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.font.bold};
  font-size: 1rem;
  margin: 0 8px;
`;
