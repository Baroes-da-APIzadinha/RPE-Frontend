import styled from "styled-components";

export const Modal = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface.default};
  padding: 2.4rem;
  width: 100%;
  max-width: 1080px;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  max-height: 100vh;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.6rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

`;

