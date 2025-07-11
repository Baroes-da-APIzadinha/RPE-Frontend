import { useParams } from "react-router-dom";
import { Title } from "@/components/Title";
import { Card } from "@/components/Card";

export function BrutalFactsPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div style={{ padding: "1rem" }}>
      <Title>Brutal Facts - Mentorado {id}</Title>
      <Card>
        <p>Página de Brutal Facts em desenvolvimento...</p>
      </Card>
    </div>
  );
}
