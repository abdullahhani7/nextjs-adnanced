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

  try {
    const data = (await request.json()) as IUpdatedPostDTO;

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

// DELETE Single Post
export const DELETE = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ message: "Post Deleted" }, { status: 200 });
};
