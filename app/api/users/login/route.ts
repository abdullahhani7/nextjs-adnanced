import { ILoginUserDTO } from "@/app/_utils/dto";
import { prisma } from "@/app/_utils/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (request: NextRequest) => {
  //   console.log("requesttt",request);
  try {
    const body = (await request.json()) as ILoginUserDTO;

    const loginUserValidation = z.object({
      email: z.string().email().max(150),
      password: z.string().min(6).max(100),
    });

    const validation = loginUserValidation.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "you dont have an account, please register ..." },
        { status: 400 },
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return NextResponse.json(
        {
          message: "invalid email or password, please try again.",
        },
        { status: 401 },
      );
    }

    // token
    const token = null;

    return NextResponse.json(
      { message: "Authenticated", token },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid internal server!" },
      { status: 500 },
    );
  }
};
