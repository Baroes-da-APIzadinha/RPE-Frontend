import styled from 'styled-components';


export const CardContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const DateRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;

  & > * {
    flex: 1;
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;


