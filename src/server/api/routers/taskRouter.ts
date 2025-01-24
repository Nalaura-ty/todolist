import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ctx}) => {
    const tasks = await ctx.db.task.findMany();
    console.log("retorno: ", tasks)
    return tasks;
  }),

  getDetails: publicProcedure.input(
    z.object({
      id: z.string()
    })
  ).query(async ({ctx,input}) => {
    const taskDetail = ctx.db.task.findUnique({
      where: {id: input.id}
    })
    return taskDetail;
  }),

  create: publicProcedure.input(
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string()  // ID da categoria
    })
  ).mutation(async ({input, ctx}) => {
    const {title, description, category} = input;
  
    // Verifique se a categoria existe
    const existingCategory = await ctx.db.category.findUnique({
      where: { id: category }
    });
  
    if (!existingCategory) {
      throw new Error('Categoria não encontrada');
    }
  
    // Agora crie a tarefa associada à categoria
    const newTask = await ctx.db.task.create({
      data: {
        title,
        description,
        category: {
          connect: { id: category },
        },
      },
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
  }),

  toggleChecked: publicProcedure.input(
    z.object({
      id: z.string(),
      completed: z.boolean()
    })
  ).mutation(async ({ctx, input}) => {
    const checkTask = ctx.db.task.update({
      where: {id: input.id},
      data: {completed: input.completed}
    })
    return checkTask;
  })
});
