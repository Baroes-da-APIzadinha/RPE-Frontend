import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import { MdMoreHoriz } from "react-icons/md";

type Props = {
  onEditar?: () => void;
  onAjustarPeso?: () => void;
  onDesativar?: () => void;
};

export function DropdownActions({
  onEditar,
  onAjustarPeso,
  onDesativar,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  return (
    <S.Container ref={ref}>
      <S.IconButton onClick={() => setOpen((prev) => !prev)}>
        <MdMoreHoriz />
      </S.IconButton>
      {open && (
        <S.Dropdown>
          <S.Title>Ações</S.Title>
          <S.Item onClick={onEditar}>Editar</S.Item>
          <S.Item onClick={onAjustarPeso}>Ajustar peso</S.Item>
          <S.Item danger onClick={onDesativar}>
            Desativar
          </S.Item>
        </S.Dropdown>
      )}
    </S.Container>
  );
}
