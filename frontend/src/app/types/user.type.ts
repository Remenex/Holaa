type User = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
};

type LoginUser = Pick<User, "email" | "password">;

type CreateUser = Omit<User, "_id" | "createdAt">;

type SearchUser = User & { pending?: boolean };
