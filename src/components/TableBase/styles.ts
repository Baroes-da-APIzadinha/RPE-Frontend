import styled from "styled-components";

export const StyledTableBase = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  background: ${({ theme }) => theme.colors.surface.default};
`;

export const StyledTableTitle = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.xlarge};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
export const StyledTableSubtitle = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
`;
export const StyledTableChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
