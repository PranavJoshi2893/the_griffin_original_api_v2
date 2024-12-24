import { compare, hash } from "bcrypt";
import prisma from "../model/prisma.config";
import { BadRequestError, ForbiddenError, NotFoundError } from "../utils/error";

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

async function registerUser(userInfo: IUser) {
  try {
    const { first_name, last_name, email, password } = userInfo;

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });

    return { message: "User registered successfully!" };
  } catch (e) {
    throw new BadRequestError("Something bad happened while user registration");
  }
}

async function loginUser(userInfo: IUser) {
  const { email, password } = userInfo;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      uid: true,
      email: true,
      password: true,
    },
  });

  if (!user) throw new NotFoundError("Invalid Credentials");

  const isMatched = await compare(password, user.password);

  if (!isMatched) throw new ForbiddenError("Invalid Password");

  return { message: "Login Successful!" };
}

export { registerUser, loginUser };
