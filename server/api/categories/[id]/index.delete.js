import { Category } from "~~/server/models/category.model";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  try {
    await Category.findByIdAndDelete(id);
    return {
      statusCode: 204,
      statusMessage: "Category successfuly deleted"
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error deleteing category: ${error.message}`
    });
  }
});
