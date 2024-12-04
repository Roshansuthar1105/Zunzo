const z = require("zod");
// creating a schema for registration
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Enter a valid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(4, { message: "password must have min of length 4" })
    .max(16, { message: "password must have max of length 16" }),
});
const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must have min of length 3" })
    .max(255, { message: "Name must have max of length 255" }),
  phone: z
    .string({ required_error: "Phone No. is required" })
    .trim()
    .length(10, { message: "Phone Must be of length 10" }),
  role: z.string({ required_error: "Upload your profile picture" }),
});
// now we have to pass this to middleware to check it meets our requirements or not ?
module.exports = { signUpSchema, loginSchema };
