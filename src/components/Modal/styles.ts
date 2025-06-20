import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.border.radius.medium};
  width: 100%;
  max-width: 600px;
  padding: 2.4rem;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
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
  gap: 1.6rem;
`;

export const Icon = styled.div<{
  color?: "default" | "info" | "success" | "warning" | "error";
  size?: "small" | "medium" | "large";
}>`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${({ color = "default", theme }) =>
    color === "info"
      ? theme.colors.info.default
      : color === "success"
      ? theme.colors.success.default
      : color === "warning"
      ? theme.colors.warning
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
  align-items: center;
  gap: 0.8rem;
`;