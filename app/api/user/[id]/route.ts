import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../db/dbConnect";
import { asyncHandler, authentication } from "../../../middleware";
import { UserModel } from "../../../models";
import { UpdateUserPayload } from "../../../types";
import { statusCode } from "../../../utils/response_code";
import {
  FailureResponse,
  SuccessResponse,
} from "../../../utils/response_handler";
import { responseMessage } from "../../../utils/response_message";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await UserModel.findById(params.id);
  if (!user) {
    return FailureResponse(statusCode.notFound, responseMessage.userNotFound);
  }

  return SuccessResponse(responseMessage.userFetched, user);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (params.id !== (req as any).user._id) {
    return FailureResponse(
      statusCode.methodNotAllowed,
      responseMessage.methodNotAllowed
    );
  }

  const payload: UpdateUserPayload = await req.json();
  const user = await UserModel.findByIdAndUpdate(params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return FailureResponse(statusCode.notFound, responseMessage.userNotFound);
  }

  return SuccessResponse(responseMessage.userUpdated, user);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (params.id !== (req as any).user._id) {
    return FailureResponse(
      statusCode.methodNotAllowed,
      responseMessage.methodNotAllowed
    );
  }

  const user = await UserModel.findByIdAndDelete(params.id);
  if (!user) {
    return FailureResponse(statusCode.notFound, responseMessage.userNotFound);
  }

  return SuccessResponse(responseMessage.userDeleted, user);
};
