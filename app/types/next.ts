import { NextRequest, NextResponse } from "next/server";
import { GetUserData } from "./UserEntity";

export interface NextRequestWithUser extends NextRequest {
  user?: GetUserData | null;
}

export type NextFunction<T = any> = (
  req: NextRequestWithUser,
  res: NextResponse<T>
) => unknown | Promise<unknown>;
