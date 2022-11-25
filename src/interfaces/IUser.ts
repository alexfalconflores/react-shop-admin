export interface IGetUser {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;
}

export interface IPostUser {
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;
}
