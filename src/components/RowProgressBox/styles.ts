import styled from "styled-components";

export const RowBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 600;
  margin: 0 0 2.2rem 0; /* espaço maior após o título */
`;

export const BarWrapper = styled.div`
  flex: 1;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-width: 340px;
  min-height: 170px;
  position: relative;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const BarsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  justify-content: space-between;
`;

export const BarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 100px;
  flex: 1;
`;

export const BarHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.3rem;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 600;
`;

export const Percent = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 600;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  overflow: hidden;
`;

export const Progress = styled.div<{ $value: number; $color?: string }>`
  height: 100%;
  background: ${({ theme }) =>theme.colors.black};
  width: ${({ $value }) => Math.min(Math.max($value, 0), 100)}%;
  transition: width 0.3s;
`;
