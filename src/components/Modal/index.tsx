import { MdClose } from "react-icons/md";
import * as S from "./styles.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ open, title, description, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <div>
            {title && <S.Title>{title}</S.Title>}
            {description && <S.Subtitle>{description}</S.Subtitle>}
          </div>
          <S.CloseButton onClick={onClose}>
            <MdClose size={24} />
          </S.CloseButton>
        </S.Header>

        <S.Content>{children}</S.Content>
      </S.Container>
    </S.Overlay>
  );
}
