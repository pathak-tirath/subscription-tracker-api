import { model, Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Please Enter an email address"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          return validator.isEmail(v);
        },
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true },
);

export default model("User", userSchema);
