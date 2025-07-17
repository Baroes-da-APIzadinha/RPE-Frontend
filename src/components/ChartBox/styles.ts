import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 350px;
  width: 100%;
  min-width: 260px;
  max-height: 350px;
  position: relative;
  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
    padding: 1rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  min-width: 160px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.bold};
  margin: 0 0 0.5rem 0;
`;

export const SubTitle = styled.h4` 
  color: ${ ({theme}) =>theme.colors.text.secondary};
  font-size: ${ ({theme}) =>theme.font.sizes.xsmall};
  font-weight: ${ ({theme}) =>theme.font.medium};
  margin: 0;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: 1;

  @media (max-width: 1024px) {
    max-width: 400px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

