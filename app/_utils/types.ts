type TPost = {
  id: number;
  title: string;
  body: string;
};

type TPostsResponse = {
  posts: TPost[];
};

export type { TPostsResponse, TPost };
