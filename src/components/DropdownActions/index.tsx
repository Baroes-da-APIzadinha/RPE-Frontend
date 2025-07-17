import { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import { MdMoreHoriz, MdMoreVert } from "react-icons/md";

export interface DropdownAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

type Props = {
  actions: DropdownAction[];
  title?: string;
  orientation?: "horizontal" | "vertical";
  position?: "top" | "bottom";
};

export function DropdownActions({
  actions,
  title = "Ações",
  orientation = "horizontal",
  position = "top",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <S.Container ref={ref}>
      <S.IconButton onClick={() => setOpen((prev) => !prev)}>
        {orientation === "horizontal" ? <MdMoreHoriz /> : <MdMoreVert />}
      </S.IconButton>

      {open && (
        <S.Dropdown $position={position}>
          <S.Title>{title}</S.Title>
          {actions.map((action, idx) => (
            <S.Item
              key={idx}
              onClick={() => {
                setOpen(false);
                action.onClick();
              }}
              danger={action.danger}
            >
              {action.icon && <span style={{ marginRight: 8 }}>{action.icon}</span>}
              {action.label}
            </S.Item>
          ))}
        </S.Dropdown>
      )}
    </S.Container>
  );
}
