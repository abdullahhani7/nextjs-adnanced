import { IRegisterUserDTO } from "@/app/_utils/dto";
import { prisma } from "@/app/_utils/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as IRegisterUserDTO;

    const createdNewUserValidation = z.object({
      username: z.string().min(5).max(15),
      email: z.string().min(5).max(40),
      password: z.string().min(6).max(30),
    });

    const validation = createdNewUserValidation.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message });
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "user is already existed",
        },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    return NextResponse.json(newUserData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 400 },
    );
  }
};
