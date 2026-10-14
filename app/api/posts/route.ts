import { ICreatedPostDTO } from "@/app/_utils/dto";
import { prisma } from "@/app/_utils/lib/prisma";
import { createPostSchema } from "@/app/_utils/validation";
import { Post } from "@/app/generated/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  // console.log(request);
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as ICreatedPostDTO;

    const validation = createPostSchema.safeParse(body);
    // console.log("validationnnn", validation.error);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const newPost: Post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
