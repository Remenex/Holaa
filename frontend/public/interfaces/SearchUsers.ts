export interface SearchUser{
    id: number;
    image: string;
    fullName: string;
    email: string;
    add?: () => void;
    pending?: boolean;
  };
  
  