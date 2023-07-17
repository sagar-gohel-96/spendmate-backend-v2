import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserSchemaEntity } from "../types";

const userSchema = new Schema<UserSchemaEntity>(
  {
    email: {
      type: "string",
      require: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: "Invalid email address",
      },
    },
    name: { type: "string", require: true },
    password: { type: "string", require: true, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
  }
  next();
});

userSchema.methods.generateAuthToken = function (): string {
  console.log(process.env.NEXT_PUBLIC_JWT_SECRET_KEY);

  try {
    return jwt.sign(
      { _id: this._id },
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string
    );
  } catch (error) {
    console.log(error);
    return "Something went wrong while generate auth token";
  }
};

export const UserModel =
  mongoose.models.Users ||
  mongoose.model<UserSchemaEntity>("Users", userSchema);
