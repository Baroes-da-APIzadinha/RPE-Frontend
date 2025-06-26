import * as S from "./styles";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: TextareaProps) {
  return <S.StyledTextarea {...props} />;
}
