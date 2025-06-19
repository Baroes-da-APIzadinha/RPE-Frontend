import { useState } from "react";
import * as S from "./styles";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  placeholder?: string;
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
};

export function Select({ label, placeholder = "Selecione", options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find(opt => opt.value === value);

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      <S.SelectBox onClick={() => setOpen(!open)} $open={open}>
        {selected?.label || placeholder}
        <S.Chevron $open={open}>▾</S.Chevron>
      </S.SelectBox>

      {open && (
        <S.OptionsList>
          {options.map(option => (
            <S.Option
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </S.Option>
          ))}
        </S.OptionsList>
      )}
    </S.Container>
  );
}
