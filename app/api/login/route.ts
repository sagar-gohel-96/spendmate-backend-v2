import bcrypt from "bcrypt";
import dbConnect from "../../db/dbConnect";
import { asyncHandler } from "../../middleware";
import { UserModel } from "../../models";
import { statusCode } from "../../utils/response_code";
import { FailureResponse, SuccessResponse } from "../../utils/response_handler";
import { responseMessage } from "../../utils/response_message";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  const { email, password } = await req.json();

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return FailureResponse(statusCode.notFound, responseMessage.userNotFound);
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return FailureResponse(
      statusCode.badRequest,
      responseMessage.invalidCredentials
    );
  }

  const token = await user.generateAuthToken();

  const TOKEN_LIFE = 60 * 60 * 24 * 7;

  const cookieStore = cookies();
  cookieStore.set("token", token, {
    maxAge: TOKEN_LIFE,
    path: "/",
  });

  return SuccessResponse(responseMessage.loginSuccessfully, token);
};
