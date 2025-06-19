import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
  padding: 1.6rem;
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface.default};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.4rem;
`;

export const List = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Alert = styled.div<{ $type: "error" | "warning" | "info" }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-radius: 0.75rem;
  background: ${({ theme, $type }) =>
    $type === "error"
      ? theme.colors.error.light
      : $type === "warning"
      ? theme.colors.secondary.light
      : theme.colors.info.light};

    
`;

export const AlertTitle = styled.strong`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
`;


export const AlertDescription = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.xsmall};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AlertButton = styled.div`
  margin-left: 2rem;
`;
