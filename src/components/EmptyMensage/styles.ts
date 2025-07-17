import theme from '@/styles/theme'
import styled from 'styled-components'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  padding: 2rem;
  gap: 1.2rem;
  color: ${theme.colors.text.secondary};

  h2 {
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.text.primary};
  }

  p {
    font-size: ${theme.font.sizes.small};
    max-width: 480px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.surface.alt};
  color: ${theme.colors.primary.default};
  border-radius: 50%;
  width: 56px;
  height: 56px;
`;
