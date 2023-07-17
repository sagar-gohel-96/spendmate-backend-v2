import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../db/dbConnect";
import { asyncHandler, authentication } from "../../../middleware";
import { TransactionModel } from "../../../models";
import { UpdateTransactionPayload, GetTransactionData } from "../../../types";
import { statusCode } from "../../../utils/response_code";
import {
  FailureResponse,
  SuccessResponse,
} from "../../../utils/response_handler";
import { responseMessage } from "../../../utils/response_message";
import { NextFunction } from "../../../types/next";
import * as Mongoose from "mongoose";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  const transaction: GetTransactionData = await TransactionModel.findById(
    params.id
  );

  if (!transaction) {
    return FailureResponse(
      statusCode.notFound,
      responseMessage.transactionNotFound
    );
  }

  return SuccessResponse(responseMessage.transactionFetched, transaction);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();
  const payload = await req.json();

  const transaction = await TransactionModel.findById(params.id);

  if (!transaction) {
    return FailureResponse(
      statusCode.notFound,
      responseMessage.transactionNotFound
    );
  }

  if (
    transaction.userId.toString() !==
    new Mongoose.Types.ObjectId("6465cd7a0c6dda4cfa814552").toString()
  ) {
    return FailureResponse(
      statusCode.methodNotAllowed,
      responseMessage.methodNotAllowed
    );
  }

  await TransactionModel.findByIdAndUpdate(params.id, payload, {
    new: true,
    runValidators: true,
  });

  return SuccessResponse(responseMessage.transactionUpdated, transaction);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  const transaction = await TransactionModel.findById(params.id);

  if (!transaction) {
    return FailureResponse(
      statusCode.notFound,
      responseMessage.transactionNotFound
    );
  }

  if (transaction.userId.toString() !== (req as any).user._id.toString()) {
    return FailureResponse(
      statusCode.methodNotAllowed,
      responseMessage.methodNotAllowed
    );
  }

  await TransactionModel.findByIdAndDelete(params.id);

  return SuccessResponse(responseMessage.transactionDeleted, transaction);
};
