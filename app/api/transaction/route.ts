import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../db/dbConnect";
import { asyncHandler, authentication } from "../../middleware";
import { TransactionModel, UserModel } from "../../models";
import { CreateTransactionPayload, GetTransactionData } from "../../types";
import { statusCode } from "../../utils/response_code";
import { FailureResponse, SuccessResponse } from "../../utils/response_handler";
import { responseMessage } from "../../utils/response_message";
import { NextRequestWithUser } from "../../types/next";

export const GET = async (req: NextRequestWithUser) => {
  const authInfo = await authentication();

  if (!authInfo) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const transactions: GetTransactionData[] | null = await TransactionModel.find(
    { userId: authInfo._id }
  ).sort({
    createdAt: -1,
  });
  if (transactions) {
    return SuccessResponse(responseMessage.transactionFetched, transactions);
  }

  return FailureResponse(
    statusCode.notFound,
    responseMessage.transactionNotFound
  );
};

export const POST = async (req: NextRequestWithUser) => {
  const authInfo = await authentication();

  if (!authInfo) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const payload: CreateTransactionPayload = await req.json();

  payload.userId = authInfo._id;

  const transaction: GetTransactionData = await TransactionModel.create(
    payload
  );
  if (!transaction) {
    return FailureResponse(
      statusCode.notFound,
      responseMessage.failToCreateTransaction
    );
  }

  return SuccessResponse(responseMessage.transactionCreated, transaction);
};
