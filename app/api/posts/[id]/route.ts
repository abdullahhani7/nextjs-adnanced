import { posts } from "@/app/_utils/data";
import { IUpdatedPostDTO } from "@/app/_utils/dto";
import { prisma } from "@/app/_utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ISinglePostProps {
  params: Promise<{ id: string }>;
}

// Get Single Post
export const GET = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  const { id } = await params;

  //   console.log("id", id);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

// PUT Single Post
export const PUT = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  const { id } = await params;

  //   console.log("id", id);

  const post = posts.find((p) => p.id === parseInt(id));

  const data = (await request.json()) as IUpdatedPostDTO;

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "post updates" }, { status: 200 });
};

// DELETE Single Post
export const DELETE = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  const { id } = await params;

  //   console.log("id", id);

  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "post deleted" }, { status: 200 });
};
