import { NextRequest } from "next/server";
import dbConnect from "../../db/dbConnect";
import { asyncHandler } from "../../middleware";
import { UserModel } from "../../models";
import { CreateUserPayload, UserSchemaEntity } from "../../types";
import { statusCode } from "../../utils/response_code";
import { FailureResponse, SuccessResponse } from "../../utils/response_handler";
import { responseMessage } from "../../utils/response_message";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  const payload: CreateUserPayload = await req.json();

  const userExists = await UserModel.findOne({
    email: payload.email,
  });

  if (userExists) {
    return FailureResponse(statusCode.badRequest, responseMessage.userExist);
  }

  const user: UserSchemaEntity = await UserModel.create(payload);

  if (!user) {
    return FailureResponse(
      statusCode.internalServerError,
      responseMessage.failToSignup
    );
  }

  const token = user.generateAuthToken();

  const TOKEN_LIFE = 60 * 60 * 24 * 7;

  const cookieStore = cookies();
  cookieStore.set("token", token, {
    maxAge: TOKEN_LIFE,
    path: "/",
  });

  return SuccessResponse(responseMessage.loginSuccessfully, token);
};
