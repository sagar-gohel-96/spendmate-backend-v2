import * as Mongoose from "mongoose";
import { BaseEntity } from "./BaseEntity";

export enum TransactionType {
  Expense = "Expense",
  Income = "Income",
}

export interface TransactionSchemaEntity {
  userId: Mongoose.Types.ObjectId;
  transactionType: TransactionType;
  category: string;
  description: string;
  amount: number;
  date: Date;
}

export type CreateTransactionPayload = TransactionSchemaEntity;

export type GetTransactionData = (BaseEntity & CreateTransactionPayload) | null;

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;
