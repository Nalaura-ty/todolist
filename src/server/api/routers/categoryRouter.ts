import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const CategoryRouter = createTRPCRouter({

    getCategory: publicProcedure.query( async ({ctx}) => {
        const categories = await ctx.db.category.findMany();
        console.log(categories)
        return categories;
      }),

    getCategoryId: publicProcedure.input(
        z.object({
            id: z.string()
        })
    ).query( async ({ctx, input}) => {
        const categoryEspecific = ctx.db.category.findUnique({
            where: {id: input.id}
        })
        return categoryEspecific;
    }),
});