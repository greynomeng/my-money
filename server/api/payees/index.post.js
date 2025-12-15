import { Payee } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newPayee = await Payee.create(body);
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
