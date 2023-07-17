import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../db/dbConnect";
import { asyncHandler, authentication } from "../../middleware";
import { SuccessResponse } from "../../utils/response_handler";
import { responseMessage } from "../../utils/response_message";

export const GET = async (req: NextRequest) => {
  if (req.method === "GET") {
    await dbConnect();
    return SuccessResponse(responseMessage.userFetched, (req as any).user);
  }
};
