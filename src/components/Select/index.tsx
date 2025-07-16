import { useState, useRef, useEffect } from "react";
import * as S from "./styles";

// Hook para detectar cliques fora do elemento
function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  placeholder?: string;
  options: Option[];
  value: string | string[] | null;
  isMulti?: boolean;
  error?: boolean;
  disabled?: boolean;
  onChange: (value: string | string[]) => void;
};

export function Select({
  label,
  placeholder = "Selecione",
  options,
  value,
  onChange,
  isMulti = false,
  error,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Usar o hook para fechar quando clicar fora
  useClickOutside(selectRef, () => {
    setOpen(false);
  });

  const handleSelect = (selectedValue: string) => {
    if (disabled) return;

    if (isMulti) {
      const current = Array.isArray(value) ? value : [];
      const alreadySelected = current.includes(selectedValue);

      const newValue = alreadySelected
        ? current.filter((val) => val !== selectedValue)
        : [...current, selectedValue];

      onChange(newValue);
    } else {
      onChange(selectedValue);
      setOpen(false);
    }
  };

  const isSelected = (val: string) =>
    Array.isArray(value) ? value.includes(val) : value === val;

  const selectedOptions = isMulti
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value);

  return (
    <S.Container ref={selectRef}>
      {label && <S.Label>{label}</S.Label>}

      <S.SelectBox
        onClick={() => !disabled && setOpen(!open)}
        $open={open}
        error={error}
        $disabled={disabled}
      >
        <span>
          {isMulti
            ? Array.isArray(value) && value.length > 0
              ? `${value.length} selecionado${value.length > 1 ? "s" : ""}`
              : placeholder
            : (selectedOptions as Option)?.label || placeholder}
        </span>
        <S.Chevron $open={open}>▾</S.Chevron>
      </S.SelectBox>

      {open && !disabled && (
        <S.OptionsList>
          {options.map((option) => (
            <S.Option
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $selected={isSelected(option.value)}
            >
              {option.label}
            </S.Option>
          ))}
        </S.OptionsList>
      )}
    </S.Container>
  );
}
