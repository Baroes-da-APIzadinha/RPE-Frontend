import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const GenerateSummaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

export const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SummaryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SummaryContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  
  .loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-style: italic;
  }
`;

export const SummarySection = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      
      &:last-child {
        border-bottom: none;
      }
      
      &:before {
        content: "•";
        color: ${({ theme }) => theme.colors.primary.default};
        margin-right: 0.5rem;
      }
    }
  }
`;

export const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TabContent = styled.div`
  margin-top: 2rem;
`;

export const EvaluationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const EvaluationSection = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuestionItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const Question = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const Answer = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface.alt};
  border-radius: 8px;
  margin-top: 0.5rem;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const RatingValue = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 600;
  font-size: 1.1rem;
`;

export const Evaluation360Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ColleagueEvaluation = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
`;

export const ColleagueName = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ColleagueRole = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: normal;
`;

export const ScoreOverview = styled.div`
  background: ${({ theme }) => theme.colors.surface.alt};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScoreLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

export const ScoreValue = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 600;
  font-size: 1.2rem;
`;
