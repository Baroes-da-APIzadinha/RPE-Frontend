export type Role = "colaborador" | "rh" | "gestor" | "comite" | "lider" | "mentor" | "admin";

export type PerfilData = {
  userId: string;
  userName: string;
  roles: Role[];
  mainRole: Role;
};

