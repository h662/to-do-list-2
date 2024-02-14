import { NextRequest, NextResponse } from "next/server";

// 투두 생성
export const POST = async (request: NextRequest) => {
  try {
    // 토큰 확인 (검증)
    // 투두를 생성
    // 응답
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
