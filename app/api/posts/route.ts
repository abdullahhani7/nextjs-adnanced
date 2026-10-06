import { posts } from "@/app/_utils/data";
import { ICreatedPostDTO } from "@/app/_utils/dto";
import { TPost } from "@/app/_utils/types";

import { NextRequest, NextResponse } from "next/server";
import z, { string } from "zod";

export const GET = (request: NextRequest) => {
  console.log(request);
  return NextResponse.json(posts, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as ICreatedPostDTO;
  // console.log(body);

  const createPostSchema = z.object({
    title: string().min(5, "Title must be at least 5 characters").max(100),
    body: string().min(10),
  });

  const validation = createPostSchema.safeParse(body);
  // console.log("validationnnn", validation.error);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 },
    );
  }

  const newPost: TPost = {
    id: posts.length + 1,
    userId: 5,
    title: body.title,
    body: body.body,
  };

  posts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
};
