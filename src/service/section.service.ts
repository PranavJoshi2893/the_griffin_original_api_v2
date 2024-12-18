import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequestError, ConflictError } from "../utils/error";
import prisma from "../model/prisma.config";

interface ISection {
  section_name: string;
}

async function createSection(section: ISection) {
  try {
    await prisma.section.create({
      data: section,
    });

    return { message: "New section added" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") throw new ConflictError("Section already exists");
    }
    throw new BadRequestError("Somthing bad happened during adding section");
  }
}

async function getSection(id: number) {
  try {
    const section = await prisma.section.findUnique({
      where: { sid: id },
    });

    return section;
  } catch (e) {
    throw new BadRequestError("Something bad happened during retriving section");
  }
}

async function getAllSections() {
  const sections = await prisma.section.findMany({
    select: {
      sid: true,
      section_name: true,
    },
  });

  return sections;
}

async function updateSection(section: ISection, id: number) {
  try {
    await prisma.section.update({
      where: { sid: id },
      data: section,
    });

    return { message: "section information updated" }
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during updating section");
  }
}

async function deleteSection(id: number) {
  try {
    await prisma.section.delete({
      where: { sid: id },
    });
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during deleting selection");
  }
}

export { createSection, getSection, getAllSections, updateSection, deleteSection };
