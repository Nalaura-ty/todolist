import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { title } from "process";
import { Input } from "postcss";

export const taskRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ctx}) => {
    const tasks = await ctx.db.task.findMany();
    console.log("retorno: ", tasks)
    return tasks;
  }),

  create: publicProcedure.input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ).mutation(async ({input,ctx}) => {
    const {title, description} = input
    const newTask = await ctx.db.task.create({
      data: {
        title,
        description
      }
    });
    return newTask;
  }),

  delete: publicProcedure.input(
    z.object({
      id: z.string()
    })
  ).mutation(async ({ctx, input}) => {
    const deleteTask = ctx.db.task.delete({
      where: {id: input.id}
    })
    return deleteTask;
  })
});
