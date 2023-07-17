import { TransactionSchemaEntity, TransactionType } from "../types";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema<TransactionSchemaEntity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user_model",
    },
    transactionType: {
      type: String,
      enum: TransactionType,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      defaultValue: new Date(),
    },
  },
  { timestamps: true }
);

export const TransactionModel =
  mongoose.models.Transactions ||
  mongoose.model<TransactionSchemaEntity>("Transactions", transactionSchema);
