import * as S from "./styles";

type Props = {
  label?: string;
  checked: boolean;
  onChange: () => void;
};

export function Checkbox({ label, checked, onChange }: Props) {
  return (
    <S.Label>
      <S.Input type="checkbox" checked={checked} onChange={onChange} />
      <S.Box checked={checked} />
      <span>{label}</span>
    </S.Label>
  );
}
