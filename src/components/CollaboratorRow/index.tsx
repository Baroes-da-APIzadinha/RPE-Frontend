import * as S from "./styles.ts";
import {
  MdInsertDriveFile,
  MdApartment,
  MdAccountCircle,
} from "react-icons/md";
import { DropdownActions } from "@/components/DropdownActions"; // se já estiver usando

interface Props {
  name: string;
  email: string;
  role: string;
  track: string;
  unit: string;
}

export function CollaboratorRow({ name, email, role, track, unit }: Props) {
  return (
    <S.Row>
      <S.Colaborador>
        <MdAccountCircle size={64} />
        <S.Info>
          <p>{name}</p>
          <span>{email}</span>
        </S.Info>
      </S.Colaborador>
      <td>{role}</td>
      <td>
        <S.Track>
          <MdInsertDriveFile size={24} />
          {track}
        </S.Track>
      </td>
      <td>
        <S.Unit>
          <MdApartment size={24} />
          {unit}
        </S.Unit>
      </td>
      <td>
        <DropdownActions
          actions={[
            {
              label: "Editar",
              onClick: () => {},
            },
            {
              label: "Modificar Permissões",
              onClick: () => {},
            },
            {
              label: "Desativar",
              onClick: () => {},
              danger: true,
            },
          ]}
        />
      </td>
    </S.Row>
  );
}
