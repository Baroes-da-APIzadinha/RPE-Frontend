import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-width: 260px;
  min-height: 220px;
  position: relative;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    padding: 1rem;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
    
`;
