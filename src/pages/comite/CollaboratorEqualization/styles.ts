import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.background};
`
export const Main = styled.main`
  flex: 1;
  padding: ${theme.spacings.large};
  background-color: ${theme.colors.background};
  overflow-y: auto;
  padding-top: ${theme.spacings.small}; 
`

//Header Styles
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
// Card Styles

export const Container = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 2rem; 
  flex-direction: row;
  justify-content: space-between;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  gap: 0.4rem;

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
export const Subtitle = styled.h2`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.medium};
  color: ${theme.colors.text.secondary};
`

// Card styles

// User card header
export const CardContainer = styled.div`
  background-color: ${theme.colors.surface.default};
  border-radius: ${theme.border.radius.medium};
  border: 1px solid ${theme.colors.border};
  margin-bottom: 1rem;
  padding: 2rem;
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
`;


export const DropButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 0;
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

export const EqualizationBadge = styled.span<{ $status: string }>`
  margin-left: 0.6rem;
  padding: 0.2rem 0.6rem;
  font-size: ${theme.font.sizes.xxsmall};
  font-weight: ${theme.font.bold};
  border-radius: ${theme.border.radius.full};
  text-transform: capitalize;

  ${({ $status, theme }) =>
    $status === "concluida"
      ? css`
          background: ${theme.colors.success.light};
          color: ${theme.colors.success.default};
        `
      : $status === "andamento"
      ? css`
          background: ${theme.colors.secondary.light};
          color: ${theme.colors.secondary.default};
        `
      : css`
          background: ${theme.colors.error.light};
          color: ${theme.colors.error.default};
        `}
`;


export const Role = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  font-weight: ${theme.font.semibold};
  color: ${theme.colors.text.secondary};
`;


export const UserActions = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
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
    if ($value >= 0.7) return theme.colors.error.default;
    if ($value >= 0.4) return theme.colors.secondary.default;
    return theme.colors.success.default;
  }};
`;

 
// Info Styles
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid ${theme.colors.border};
  gap: 1.2rem;
`;

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

export const StatusLabel = styled.span`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.primary};
`;

export const StatusLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.4rem;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background: ${theme.colors.text.primary};
  color: ${theme.colors.background};
  padding: 0.4rem 0.8rem;
  border-radius: ${theme.border.radius.full};
  font-size: ${theme.font.sizes.xxsmall};
  font-weight: ${theme.font.normal};
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

export const StarLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-right: 0.5rem;
`;

export const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.default : theme.colors.lightGray};
  font-size: 1.7rem;
  transition: color 0.2s;
  padding: 0;
`;

export const Score = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 0.7rem;
`;

