import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;


export const Title = styled.h1`
  font-size: ${({theme}) => theme.font.sizes.xlarge};
  font-weight: ${({theme}) => theme.font.bold};
  color: ${({theme}) => theme.colors.text.primary};
`
export const Subtitle = styled.h2`
  font-size: ${({theme}) => theme.font.sizes.medium};
  font-weight: ${({theme}) => theme.font.medium};
  color: ${({theme}) => theme.colors.text.secondary};
`

export const FiltersRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;


export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 1.5rem;
`;

export const UserCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const UserHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: ${({ theme }) => theme.font.sizes.medium};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: ${({ theme }) => theme.font.sizes.small};
    color: ${({ theme }) => theme.colors.text.primary};
  }
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