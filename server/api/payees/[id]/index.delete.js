// // import prisma from "~~/prisma/generated/client";
// import { PrismaClient } from "~~/prisma/generated/client";

// export default defineEventHandler(async (event) => {
//   const prisma = new PrismaClient();
//   const id = event.context.params.id;

//   try {
//     const updatePayee = await prisma.payee.delete({
//       where: {
//         id: parseInt(id)
//       }
//     });
//     return {
//       success: true,
//       data: updatePayee
//     };
//   } catch (error) {
//     throw createError({
//       statusCode: 500,
//       message: `Failed to delete payee: ${error}`
//     });
//   } finally {
//   }
// });
