import { compare, hash } from "bcrypt";
import prisma from "../model/prisma.config";
import { BadRequestError, ForbiddenError, NotFoundError } from "../utils/error";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../utils/jwt_generator";

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

  const access_token = accessTokenGenerator({ sub: user.uid });
  const refresh_token = refreshTokenGenerator({ sub: user.uid });

  return { message: "Login Successful!", access_token, refresh_token };
}

async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      uid: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  });

  return users;
}

async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { uid: id },
    });

    return user;
  } catch (e) {
    throw new BadRequestError("Something bad happened during retriving user");
  }
}

async function updateUser(userInfo: IUser, id: string) {
  try {
    await prisma.user.update({
      where: { uid: id },
      data: {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
      },
    });

    return { message: "User info updated successfully!" };
  } catch (e) {
    throw new BadRequestError(
      "Something bad happened during updating user info"
    );
  }
}

async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { uid: id },
    });

    return { message: "User delete successfully!" };
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during deleting user");
  }
}

async function refresh(sub: string) {
  const payload = { sub };
  return { access_token: accessTokenGenerator(payload) };
}

export {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  refresh,
};
