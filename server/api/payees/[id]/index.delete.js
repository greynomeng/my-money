import { Payee } from "~~/server/models/payee.model";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  try {
    await Payee.findByIdAndDelete(id);
    return {
      statusCode: 204,
      statusMessage: "Payee successfuly deleted"
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error deleteing payee: ${error.message}`
    });
  }
});
