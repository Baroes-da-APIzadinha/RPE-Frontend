import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

// Modal styles
export const ModalContent = styled.div`
  margin-bottom: 1.5rem;
`;

export const ModalDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${theme.colors.text.primary};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

//Header Styles
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
  gap: 1.2rem;
`

// Card Styles

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterItem = styled.div<{ $grow?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: ${({ $grow }) => ($grow ? 1 : "initial")};
  min-width: ${({ $grow }) => ($grow ? "0" : "12rem")};

  label {
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.font.medium};
  }
`;



export const Title = styled.h1`
  font-size: ${theme.font.sizes.xlarge};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`

export const UserHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr 2fr;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    grid-template-columns: 2fr;
    gap: 1.2rem;
  }
`;



export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.h3`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
  display: flex;
  align-items: center;
`;


export const Role = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.secondary};
`;


export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 100px; 
`;


export const ScoreLabel = styled.span`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
  white-space: nowrap; 
`;


export const ScoreValue = styled.span`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`;

export const DiscrepancyValue = styled.span<{ $value: number | null }>`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.bold};

  color: ${({ $value, theme }) => {
    if ($value === null || isNaN($value)) return theme.colors.text.secondary;
    if ($value >= 2.0) return theme.colors.error.default;
    if ($value >= 1.0) return theme.colors.warning.default;
    return theme.colors.success.default;
  }};
`;

 
// Info Styles

export const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-wrap: wrap;
    gap: 2rem;
  }
`;



export const Label = styled.h4`
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.semibold};
  margin-bottom: 0.5rem;
`;

export const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
    }
  }
`;


// Summary

export const SummaryBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: ${theme.colors.surface.hover}; // usa um tom mais leve
  border-radius: ${theme.border.radius.xxsmall};
  padding: 1rem 1.2rem;
  border-left: 4px solid ${theme.colors.primary.default};
  min-height: 80px;
`;

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.text.secondary};
  }

  strong {
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.semibold};
    color: ${theme.colors.primary.default};
    margin-bottom: 0.2rem;
  }
`;

export const IconSpan = styled.span`
  color: ${theme.colors.primary.default}

`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Score = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 0.7rem;
`;

