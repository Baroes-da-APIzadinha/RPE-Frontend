import * as S from "./styles";

type ToggleItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type Props = {
  items: ToggleItem[];
  value: string;
  onChange: (value: string) => void;
};

export function ToggleBar({ items, value, onChange }: Props) {
  return (
    <S.ToggleGroup>
      {items.map(({ value: key, label, icon }) => (
        <S.ToggleItem
          key={key}
          active={value === key}
          onClick={() => onChange(key)}
        >
          {icon}
          {label}
        </S.ToggleItem>
      ))}
    </S.ToggleGroup>
  );
}
