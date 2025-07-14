import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 1rem 1.5rem;
  text-align: center;
  min-width: 120px;
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.primary.default};
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

export const FiltersSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 250px;

  label {
    font-size: ${({ theme }) => theme.font.sizes.small};
    font-weight: ${({ theme }) => theme.font.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const MentoradoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }
  &:first-child {
    border-top: 1.5px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const MentoradoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 2;
  min-width: 0;
`;

export const Avatar = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
`;

export const MentoradoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const MentoradoNome = styled.h3`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MentoradoCargo = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MentoradoUnidade = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const DesempenhoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
`;

export const DesempenhoLabel = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DesempenhoValue = styled.span<{ $color: 'success' | 'warning' | 'error' | 'neutral' }>`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ $color, theme }) => {
    switch ($color) {
      case 'success':
        return theme.colors.success.default;
      case 'warning':
        return theme.colors.secondary.default;
      case 'error':
        return theme.colors.error.default;
      case 'neutral':
        return theme.colors.text.secondary;
      default:
        return theme.colors.text.primary;
    }
  }};
`;

export const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

export const StatusBadge = styled.span<{ $color: 'success' | 'warning' | 'error' | 'neutral' }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.border.radius.full};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  font-weight: ${({ theme }) => theme.font.semibold};
  text-transform: capitalize;
  background: ${({ $color, theme }) => {
    switch ($color) {
      case 'success':
        return theme.colors.success.light;
      case 'warning':
        return theme.colors.secondary.light;
      case 'error':
        return theme.colors.error.light;
      default:
        return theme.colors.surface.alt;
    }
  }};
  color: ${({ $color, theme }) => {
    switch ($color) {
      case 'success':
        return theme.colors.success.default;
      case 'warning':
        return theme.colors.secondary.default;
      case 'error':
        return theme.colors.error.default;
      default:
        return theme.colors.text.secondary;
    }
  }};
`;

export const UltimaAvaliacao = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xxsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 1rem 0 0.5rem;
`;

export const EmptySubtitle = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;
