import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequestError, ConflictError } from "../utils/error";
import prisma from "../model/prisma.config";

interface IGender {
  gender_name: string;
}

async function createGender(gender: IGender) {
  try {
    await prisma.product_gender.create({
      data: gender,
    });

    return { message: "New gender added" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") throw new ConflictError("Gender already exists");
    }
    throw new BadRequestError("Somthing bad happened during adding gender");
  }
}

async function getGender(id: number) {
  try {
    const gender = await prisma.product_gender.findUnique({
      where: { pgid: id },
    });

    return gender;
  } catch (e) {
    throw new BadRequestError("Something bad happened during retriving gender");
  }
}

async function getAllGender() {
  const genders = await prisma.product_gender.findMany({
    select: {
      pgid: true,
      gender_name: true,
    },
  });

  return genders;
}

async function updateGender(gender: IGender, id: number) {
  try {
    await prisma.product_gender.update({
      where: { pgid: id },
      data: gender,
    });
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during updating gender");
  }
}

async function deleteGender(id: number) {
  try {
    await prisma.product_gender.delete({
      where: { pgid: id },
    });
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during deleting gender");
  }
}

export { createGender, getGender, getAllGender, updateGender, deleteGender };
