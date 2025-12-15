import { Payee } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const payees = await Payee.find().sort({ name: 1 });

    return {
      success: true,
      data: payees
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to fetch payees: ${error}`
    });
  }
});
