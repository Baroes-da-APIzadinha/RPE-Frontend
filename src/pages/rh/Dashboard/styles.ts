import styled from 'styled-components'


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  gap: 1.2rem;
`

export const HeaderButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column; 
  gap: .5rem;
  overflow-y: auto;
  height: 100%;
`;