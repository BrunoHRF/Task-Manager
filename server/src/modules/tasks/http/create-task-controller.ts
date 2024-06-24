import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { z } from "zod";
import { TasksService } from "../tasks-service";

const bodyValidationSchema = z.object({
	description: z.string(),
	title: z.string(),
	projectId: z.string().uuid(),
});

export async function createTaskController(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/tasks",
		{
			schema: {
				body: bodyValidationSchema,
			},
		},
		async (request, reply) => {
			const { description, title, projectId } = request.body;

			const tasksService = new TasksService();
			const task = await tasksService.create({ description, title, projectId });

			return reply.code(201).send(task);
		},
	);
}
