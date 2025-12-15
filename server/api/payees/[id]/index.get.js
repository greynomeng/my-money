// // import prisma from "~~/prisma/generated/client";
// import { PrismaClient } from "~~/prisma/generated/client";

// export default defineEventHandler(async (event) => {
//   const prisma = new PrismaClient();
//   const id = event.context.params.id;

//   try {
//     const payee = await prisma.Payee.findUnique({
//       where: {
//         id: parseInt(id)
//       }
//     });
//     return {
//       success: true,
//       data: payee
//     };
//   } catch (error) {
//     throw createError({
//       statusCode: 500,
//       message: `Failed to fetch payee: ${error}`
//     });
//   } finally {
//   }
// });
