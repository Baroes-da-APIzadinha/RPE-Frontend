import { MdClose } from "react-icons/md";
import * as S from "./styles.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconColor?: "default" | "info" | "success" | "warning" | "error";
  iconSize?: "small" | "medium" | "large";
}

export function Modal({
  open,
  title,
  description,
  onClose,
  icon,
  iconColor,
  iconSize,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          {icon && (
            <S.Icon color={iconColor} size={iconSize}>
              {icon}
            </S.Icon>
          )}
          <S.TitleContainer>
            {title && <S.Title>{title}</S.Title>}
            {description && <S.Subtitle>{description}</S.Subtitle>}
          </S.TitleContainer>
          <S.CloseButton onClick={onClose}>
            <MdClose size={24} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          
          
          {children}</S.Content>
      </S.Container>
    </S.Overlay>
  );
}
