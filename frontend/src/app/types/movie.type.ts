type Movie = {
  _id: string;
  categories: Category[];
  description: string;
  mainCharacterImage: string;
  ownerId: string;
  thumbnail: string;
  title: string;
  trailer: string;
  video: string;
  imdb: number;
  duration: string;
};

type Category = {
  _id: string;
  name: string;
};
