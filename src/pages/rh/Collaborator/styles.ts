import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
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


export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const FiltersRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ToggleBar = styled.div`
  flex: 1;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.font.sizes.small};

  th {
    text-align: left;
    padding: 1.2rem;
    font-weight: ${({ theme }) => theme.font.semibold};
    color: ${({ theme }) => theme.colors.text.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 1.2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: top;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Row = styled.tr`
  td {
    padding: 1.2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Colaborador = styled.td`
  display: flex;
  align-items: center;
  gap: 1rem;

  strong {
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.85rem;
  }
`;

export const Info = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;

  p {
    font-weight: ${({ theme }) => theme.font.bold};
    font-size: ${({ theme }) => theme.font.sizes.small};
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.font.sizes.xsmall};
  }
`;

export const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const Unit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

//Modal Styles
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`
export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
export const ModalRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;
export const ModalDiv = styled.div`
  flex: 1; 
`
export const ModalText = styled.p`
  font-size: ${({theme}) => theme.font.sizes.xsmall};
  font-weight: ${({theme}) => theme.font.semibold};
  color: ${({theme}) => theme.colors.text.primary};
  margin-bottom: 0.4rem;
`

export const ModalSubText = styled.p`
  font-size: ${({theme}) => theme.font.sizes.xxsmall};
  font-weight: ${({theme}) => theme.font.medium};
  color: ${({theme}) => theme.colors.text.secondary};
  margin-bottom: 0.4rem;
`;

export const ModalCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  margin-top: 0.8rem;
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