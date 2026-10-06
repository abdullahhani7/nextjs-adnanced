import { posts } from "@/app/_utils/data";
import { ICreatedPostDTO } from "@/app/_utils/dto";
import { TPost } from "@/app/_utils/types";

import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  console.log(request);
  return NextResponse.json(posts, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as ICreatedPostDTO;
  console.log(body)

  const newPost: TPost = {
    id: posts.length + 1,
    userId: 5,
    title: body.title,
    body: body.body,
  };

  posts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
};
