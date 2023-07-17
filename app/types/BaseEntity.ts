import { Schema } from "mongoose";

export interface BaseEntity {
  _id: Schema.Types.ObjectId;
  upadatedAt: Schema.Types.Date;
  createdAt: Schema.Types.Date;
}
