import styled from "styled-components";

export const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 2.4rem;
  margin: 1.4rem 0;
`;
