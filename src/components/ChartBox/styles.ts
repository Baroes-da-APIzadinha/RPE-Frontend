import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  min-width: 260px;
  min-height: 220px;
  position: relative;
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    padding: 1rem;
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.bold};
  margin: 0 0 1rem 0;
`;

export const SubTitle = styled.h4` 
  color: ${ ({theme}) =>theme.colors.text.secondary};
  font-size: ${ ({theme}) =>theme.font.sizes.xsmall};
  font-weight: ${ ({theme}) =>theme.font.medium};
  margin: 0 0 1rem 0;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 100%;

  @media (max-width: 1024px) {
    max-width: 400px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

