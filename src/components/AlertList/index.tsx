import * as S from "./styles";
import Button from "@/components/Button";

interface AlertItem {
  type: "red" | "yellow" | "blue" | "green";
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}

interface AlertListProps {
  title: string;
  subtitle?: string;
  items: AlertItem[];
}

export function AlertList({ title, subtitle, items }: AlertListProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}

      <S.List>
        {items.map((item, index) => (
          <S.Alert key={index} $type={item.type}>
            <div>
              <S.AlertTitle>
                <span>{item.icon}</span>
                {item.title}
              </S.AlertTitle>
              <S.AlertDescription>{item.description}</S.AlertDescription>
            </div>
            <S.AlertButton>
              <Button variant={item.type === "red" ? "default" : "outline"} onClick={item.onClick}>
                {item.buttonLabel}
              </Button>
            </S.AlertButton>
          </S.Alert>
        ))}
      </S.List>
    </S.Container>
  );
}
