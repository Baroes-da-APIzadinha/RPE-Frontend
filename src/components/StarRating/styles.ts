import styled from "styled-components";

export const StarRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const StarWrapper = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
`;


export const HalfButton = styled.button<{ right?: boolean }>`
  position: absolute;
  top: 0;
  ${({ right }) => (right ? "right: 0;" : "left: 0;")}
  width: 50%;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1;
`;


export const StarButton = styled.button<{
  $active: boolean;
  $half?: boolean;
  $color?: "yellow" | "blue";
  $readOnly: boolean;
}>`
  background: none;
  border: none;
  cursor: default;
  font-size: 1.7rem;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; // impede interação visual
  color: ${({ $active, $color, theme, $readOnly }) => {
  const palette = $color === "blue" ? theme.colors.primary : theme.colors.secondary;

  if ($active && $readOnly) return palette.opacity[40]; // ativo e em modo readonly → com opacidade
  if ($active && !$readOnly) return palette.default;     // ativo e editável → cor cheia
  return theme.colors.lightGray;                          // inativo → cinza
}};


  
`;
