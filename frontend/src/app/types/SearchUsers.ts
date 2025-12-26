export interface SearchUser {
  id: string;
  image: string;
  fullName: string;
  email: string;
  add?: () => void;
  pending?: boolean;
}
