import { posts } from "@/app/_utils/data";
import { ICreatedPostDTO } from "@/app/_utils/dto";
import { prisma } from "@/app/_utils/lib/prisma";
import { createPostSchema } from "@/app/_utils/validation";
import { Post } from "@/app/generated/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  // console.log(request);
  return NextResponse.json(posts, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as ICreatedPostDTO;
  // console.log(body);

  const validation = createPostSchema.safeParse(body);
  // console.log("validationnnn", validation.error);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 },
    );
  }

  // const newPost: TPost = {
  //   id: posts.length + 1,
  //   userId: 5,
  //   title: body.title,
  //   body: body.body,
  // };

  const newPost: Post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
};
