import { posts } from "@/app/_utils/data";

import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  console.log(request);
  return NextResponse.json(posts, { status: 200 });
};
