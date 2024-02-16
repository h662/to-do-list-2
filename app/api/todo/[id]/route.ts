import { client } from "@/app/lib/prismaClient";
import { verifyToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

// 투두 수정
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await verifyToken(request);

    const { id } = params;
    const { content } = await request.json();

    if (isNaN(+id) || !content) {
      return NextResponse.json(
        {
          message: "Wrong data.",
        },
        {
          status: 400,
        }
      );
    }

    const existTodo = await client.todo.findUnique({
      where: {
        id: +id,
      },
    });

    if (!existTodo) {
      return NextResponse.json(
        {
          message: "Not exist todo.",
        },
        {
          status: 400,
        }
      );
    }

    if (user.id !== existTodo.userId) {
      return NextResponse.json(
        {
          message: "Can not access.",
        },
        {
          status: 400,
        }
      );
    }

    if (content === existTodo.content) {
      return NextResponse.json(
        {
          message: "Content is same.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedTodo = await client.todo.update({
      where: {
        id: +id,
      },
      data: {
        content,
      },
    });

    return NextResponse.json(updatedTodo);
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
