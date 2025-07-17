import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export const MenuButtonOutside = styled.button`
  display: none;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1001;
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary.default};

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MenuButtonInside = styled.button`
  display: none;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.primary.default};

  @media (max-width: 768px) {
    display: flex;
  }
`;




export const Container = styled.aside<{ $open?: boolean }>`
  width: 260px;
  height: 100vh;
  background-color: ${theme.colors.surface.default};
  padding: 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${theme.colors.border};

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s;
  }
`

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.4rem; 
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-bottom: 1.6rem;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid ${theme.colors.border};
`

export const Logo = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.primary.default};
  border-radius: 8px;
`

export const Title = styled.h1`
  font-size: ${theme.font.sizes.medium};
  font-weight: ${theme.font.bold};
  color: ${theme.colors.text.primary};
`

export const Subtitle = styled.p`
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.secondary};
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  gap: 0.8rem;
`

export const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: transparent;
  border: none;
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.primary};
  padding: 0.9rem 1rem;
  border-radius: ${theme.border.radius.medium};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s, background 0.2s;

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: ${theme.colors.primary.default};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${theme.colors.primary.light};
      color: ${theme.colors.primary.default};
    `}
`;

export const User = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.primary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  border-radius: ${theme.border.radius.medium};
  padding: 0.9rem 1rem;

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: ${theme.colors.primary.default};
  }

  &[data-active="true"] {
    background-color: ${theme.colors.primary.light};
    color: ${theme.colors.primary.default};
  }
`;

export const Logout = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${theme.font.sizes.xsmall};
  color: ${theme.colors.text.primary};
  border-radius: ${theme.border.radius.medium};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.9rem 1rem;
  transition: color 0.2s;

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }

   &:hover {
    color: ${theme.colors.error.default};
  }
`;


export const Footer = styled.div`
  padding-top: 1.4rem;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
