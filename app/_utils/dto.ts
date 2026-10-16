interface ICreatedPostDTO {
  title: string;
  content: string;
}
interface IUpdatedPostDTO {
  title: string;
  content: string;
}

interface IRegisterUserDTO {
  username: string;
  email: string;
  password: string;
}

export type { ICreatedPostDTO, IUpdatedPostDTO, IRegisterUserDTO };
