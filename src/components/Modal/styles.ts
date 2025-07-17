import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 999;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 2rem 1.6rem;
    padding-top: 4.4rem;
    overflow-y: auto;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 48rem;
  min-width: 0;
  max-height: 60rem;

  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 768px) {
    /* height: 100%; */
    max-height: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 1rem;
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.surface.default};
  z-index: 1;
  border-radius: ${({ theme }) => theme.border.radius.medium} ${({ theme }) => theme.border.radius.medium} 0 0;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 1.2rem;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.bold};
  color: ${({ theme }) => theme.colors.text.title};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.4rem;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 0;
  padding: 0.4rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-break: break-word;
  overflow-y: auto;
  padding: 2rem;

  @media (max-width: 768px) {
    /* padding: 1.6rem; */
  }
`;

export const Icon = styled.div<{
  color?: "default" | "info" | "success" | "warning" | "error";
  size?: "small" | "medium" | "large";
}>`
  display: flex;
  align-items: center;
  color: ${({ color = "default", theme }) =>
    color === "info"
      ? theme.colors.info.default
      : color === "success"
      ? theme.colors.success.default
      : color === "warning"
      ? theme.colors.warning.default
      : color === "error"
      ? theme.colors.error.default
      : theme.colors.text.primary};
  font-size: ${({ size = "medium" }) =>
    size === "small"
      ? "1.6rem"
      : size === "large"
      ? "3.2rem"
      : "2.4rem"};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  flex: 1;
`;