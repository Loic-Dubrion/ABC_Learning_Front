export type Role = {
  role_name: string;
  authorisations: string;
};

export type UserInfo = {
  user_id: number;
  username: string;
  email: string;
  establishment: string;
  roles: Role[];
};

export type ProfilData = {
  get_user_info: UserInfo;
};
