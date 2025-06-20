import * as S from "./styles.ts";
import { MdInsertDriveFile, MdApartment, MdAccountCircle } from "react-icons/md";
import { DropdownActions } from "@/components/DropdownActions"; // se já estiver usando

interface Props {
  name: string;
  email: string;
  role: string;
  track: string;
  unit: string;
  manager: string;
}

export function CollaboratorRow({
  name,
  email,
  role,
  track,
  unit,
  manager,
}: Props) {
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
          <MdInsertDriveFile />
          {track}
        </S.Track>
      </td>
      <td>
        <S.Unit>
          <MdApartment />
          {unit}
        </S.Unit>
      </td>
      <td>{manager}</td>
      <td>
        <DropdownActions />
      </td>
    </S.Row>
  );
}
