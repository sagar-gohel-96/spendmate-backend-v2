import { NextRequestWithUser, NextFunction } from "../types/next";
import { NextResponse } from "next/server";

export const asyncHandler =
  (
    fn: (
      req: NextRequestWithUser,
      res: NextResponse,
      next: NextFunction,
      params: any
    ) => void
  ) =>
  (
    req: NextRequestWithUser,
    res: NextResponse,
    next: NextFunction,
    params: any
  ) =>
    Promise.resolve(fn(req, res, next, params)).catch((error) =>
      NextResponse.json(error)
    );
