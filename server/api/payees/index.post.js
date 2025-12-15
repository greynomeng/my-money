import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newPayee = await prisma.Payee.create({ data: body });
    return {
      success: true,
      data: newPayee
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to create payee: ${error}`
    });
  }
});
