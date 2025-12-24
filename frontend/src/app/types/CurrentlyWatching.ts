export interface CurrentlyWatching{
  id: number;
  image: string;
  fullName: string;
  isAdmin?: boolean;
  designation: string;
  remove?: () => void;
};

