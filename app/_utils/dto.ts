interface ICreatedPostDTO {
  title: string;
  content: string;
}
interface IUpdatedPostDTO {
  title: string;
  body: string;
}

export type { ICreatedPostDTO, IUpdatedPostDTO };
