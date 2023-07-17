import { NextResponse } from "next/server";
import { statusCode } from "./response_code";

export const SuccessResponse = (message: string, data: any) => {
  return NextResponse.json({
    statusCode: statusCode.success,
    success: true,
    message,
    data,
  });
};

export const FailureResponse = (statusCode: number, message: string) => {
  return NextResponse.json({ statusCode, success: false, message });
};
