import joi from "joi";

export const userValidator = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
G