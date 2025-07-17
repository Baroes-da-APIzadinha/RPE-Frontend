import styled from 'styled-components';


const StyledCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 1.6rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 2fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;



export default StyledCardContainer;
