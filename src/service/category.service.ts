import prisma from "../model/prisma.config";
import { BadRequestError } from "../utils/error";

interface ICategory {
  category_name: string;
  size_category_id: number | undefined;
  parent_category_id: number | undefined;
}

async function createCategory(category: ICategory) {
  try {
    const { category_name, size_category_id, parent_category_id } = category;
    await prisma.product_category.create({
      data: {
        category_name,
        size_category_id,
        parent_category_id,
      },
    });

    return { message: "Category added Successfully!" };
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during adding category");
  }
}

async function getCategory(id: number) {
  try {
    const category = await prisma.product_category.findUnique({
      where: { pcid: id },
      select: {
        children: {
          select: {
            pcid: true,
            category_name: true,
          },
        },
      },
    });

    return category;
  } catch (e) {
    throw new BadRequestError("Something bad happend during fecting category");
  }
}

async function getAllCategories() {
  const categories = await prisma.product_category.findMany({
    where: { parent_category_id: null },
    select: {
      pcid: true,
      category_name: true,
    },
  });

  return categories;
}

async function updateCategory(category: ICategory, id: number) {
  try {
    await prisma.product_category.update({
      where: { pcid: id },
      data: category,
    });

    return { message: "Category updated Successfully" };
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during updating category");
  }
}

async function deleteCategory(id: number) {
  try {
    await prisma.product_category.delete({
      where: { pcid: id },
    });

    return { message: "Category deleted successfully" };
  } catch (e) {
    throw new BadRequestError("Somthing bad happened during deleting category");
  }
}

export {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
