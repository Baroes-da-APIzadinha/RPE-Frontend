export type Role = "colaborador" | "rh" | "gestor" | "comite" | "lider";

export type PerfilData = {
  userId: string;
  userName: string;
  roles: Role[];
  mainRole: Role;
};

