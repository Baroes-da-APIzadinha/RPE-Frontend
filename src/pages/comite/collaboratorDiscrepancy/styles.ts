import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`
export const HeaderButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`

export const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SummaryTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.primary.default};
  margin-bottom: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-style: italic;

    svg {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  strong {
    font-size: ${({ theme }) => theme.font.sizes.small};
    font-weight: ${({ theme }) => theme.font.semibold};
    color: ${({ theme }) => theme.colors.primary.default};
    margin-bottom: 0.2rem;
  }

  span {
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.4;

    &[style*="fontWeight"] {
      font-weight: ${({ theme }) => theme.font.semibold};
      color: ${({ theme }) => theme.colors.text.primary};
      margin-top: 0.5rem;
    }
  }
`;

export const SummaryDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SummaryScoreBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface.hover};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 1rem;
  border-left: 4px solid ${({ theme }) => theme.colors.primary.default};
`;

export const SummaryScoreLabel = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummaryScoreValue = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SummarySectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const SummarySectionContent = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
  padding: 0.5rem 0;
`;

// 360 evaluation

export const Evaluation360Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColleagueEvaluation = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
`;

export const ColleagueName = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ColleagueRole = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: normal;
`;

export const ScoreOverview = styled.div`
  background: ${({ theme }) => theme.colors.surface.alt};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScoreLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

export const ScoreValue = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 600;
  font-size: 1.2rem;
`;

// Estilos adicionais do CollaboratorReview
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
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const CriterioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  padding-bottom: 0;
  background: ${({ theme }) => theme.colors.surface.default};
  transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ToggleIcon = styled.span<{ $open: boolean }>`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const NotaBadge = styled.span<{ $visible?: boolean }>`
  display: ${({ $visible }) => ($visible === false ? 'none' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 .5rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: 1rem;
  margin: 0 8px;
`;

export const Divider = styled.div`
  width: 80%;
  height: 0.5px;
  background-color: #ccc;
  margin: 0 auto;
`;

// Estilos para referências (baseado no TableRowBox)
export const ReferenciaRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr 1fr;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.surface.default};
  width: 100%;
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const ReferenciaInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex: 0 0 auto;
`;

export const ReferenciaDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  
`;

export const ReferenciaIndicador = styled.span`
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ReferenciaCargo = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.font.medium};
`;

export const ReferenciaData = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ReferenciaContent = styled.div`
  flex: 1;
  padding: 0 1rem;
  border-right: 1.5px solid ${({ theme }) => theme.colors.border};
  border-left: 1.5px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ReferenciaJustificativa = styled.p`
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  
`;

export const ReferenciaActions = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

export const TipoBadge = styled.span<{ $tipo: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.bold};
  background: ${({ $tipo, theme }) => 
    $tipo === 'Técnica' 
      ? theme.colors.primary.light 
      : theme.colors.success.light 
  };
  color: ${({ $tipo, theme }) => 
    $tipo === 'Técnica' 
      ? theme.colors.primary.default 
      : theme.colors.success.default 
  };
  border: 1px solid ${({ $tipo, theme }) =>
    $tipo === 'Técnica' 
      ? theme.colors.primary.default 
      : theme.colors.success.default 
  };
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
