import { posts } from "@/app/_utils/data";
import { NextRequest, NextResponse } from "next/server";

interface ISinglePostProps {
  params: Promise<{ id: string }>;
}

export const GET = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  const { id } = await params;

  //   console.log("id", id);

  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
};
