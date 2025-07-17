import { Modal } from '@/components/Modal';
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
  margin-top: 0.25rem;
`;

export const FiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: ${({ theme }) => theme.font.sizes.small};
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ColaboradorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.hover};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const ColaboradorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 2;
  min-width: 0;
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ColaboradorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const ColaboradorNome = styled.h3`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ColaboradorCargo = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ColaboradorTrilha = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const RolesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 2;
  min-width: 0;
`;

export const RolesLabel = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const RolesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const RoleBadge = styled.span<{ $role: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  font-weight: ${({ theme }) => theme.font.medium};
  text-transform: capitalize;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.default};
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

// Modal styles
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem 0;


`;

export const StyledModal = styled(Modal)`
  padding: 1rem 2rem 2rem 2rem;
  `

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
`;

export const ModalColaboradorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ModalColaboradorNome = styled.h4`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const ModalColaboradorCargo = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const RolesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

 .roles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 por linha */
    gap: 1rem;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr); /* 2 por linha em telas menores */
    }
}
`;

export const RolesTitle = styled.h5`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const RoleCheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.hover};
  }
`;

export const RoleLabel = styled.label`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  user-select: none;
`;

export const SelectedRolesPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface.alt};
  border-radius: ${({ theme }) => theme.border.radius.medium};
`;

export const PreviewTitle = styled.h6`
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const PreviewRoles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PreviewRoleBadge = styled.span<{ $role: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.border.radius.xsmall};
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  font-weight: ${({ theme }) => theme.font.medium};
  text-transform: capitalize;
  background: ${({ theme }) => theme.colors.primary.light};
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const NoRolesText = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  button {
    @media (max-width: 768px) {
      svg {
        display: none;
      }
    }
  }
  
`;


