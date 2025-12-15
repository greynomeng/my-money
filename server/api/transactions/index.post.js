export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newTransaction = await prisma.Transaction.create(body);
    return {
      success: true,
      data: newTransaction
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to create transaction: ${error}`
    });
  }
});
