import { client } from "@/app/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 로그인
export const POST = async (request: NextRequest) => {
  try {
    const { account, password } = await request.json();

    if (!account || !password) {
      return NextResponse.json(
        {
          message: "Not exist data.",
        },
        {
          status: 400,
        }
      );
    }

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!existUser) {
      return NextResponse.json(
        {
          message: "Not exist user.",
        },
        {
          status: 400,
        }
      );
    }

    const isVerified = bcrypt.compareSync(password, existUser.password);

    if (!isVerified) {
      return NextResponse.json(
        {
          message: "Not correct password.",
        },
        {
          status: 400,
        }
      );
    }

    const token = jwt.sign({ account }, process.env.JWT_SECRET!);

    return NextResponse.json(token);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error.",
      },
      {
        status: 500,
      }
    );
  }
};
