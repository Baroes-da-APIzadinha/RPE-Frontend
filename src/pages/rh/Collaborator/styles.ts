import styled from "styled-components";


export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

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
export const ModalCheckbox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  margin-top: 0.8rem;
`;