import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../src/utils/error";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  if (
    !process.env.SEED_FIRSTNAME ||
    !process.env.SEED_LASTNAME ||
    !process.env.SEED_EMAIL ||
    !process.env.SEED_PASSWORD
  ) {
    throw new BadRequestError("Invalid");
  }

  await prisma.user.create({
    data: {
      first_name: process.env.SEED_FIRSTNAME,
      last_name: process.env.SEED_LASTNAME,
      email: process.env.SEED_EMAIL,
      password: await hash(process.env.SEED_PASSWORD, 10),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
