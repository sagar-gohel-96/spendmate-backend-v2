import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import dbConnect from "../db/dbConnect";
import { UserModel } from "../models";
import { GetUserData } from "../types";
import { NextRequestWithUser, NextFunction } from "../types/next";
import { asyncHandler } from "./asyncHandler";
import { cookies } from "next/headers";

export type Middleware = (
  req: NextRequestWithUser,
  res: NextResponse,
  next: NextFunction
) => Promise<void>;

export async function authentication(): Promise<jwt.JwtPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const verifyToken = jwt.verify(
    token as string,
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string
  ) as JwtPayload;

  if (!verifyToken) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  await dbConnect();

  const user = await UserModel.findById(verifyToken._id);

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return user;
}
