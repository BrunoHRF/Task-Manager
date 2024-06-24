import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { z } from "zod";
import { TasksService } from "../tasks-service";

const paramsValidationSchema = z.object({
	taskId: z.string().uuid(),
});

export async function concludeTaskController(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().patch(
		"/tasks/:taskId",
		{
			schema: {
				params: paramsValidationSchema,
			},
		},
		async (request, reply) => {
			const { taskId } = request.params;

			const tasksService = new TasksService();
			const task = await tasksService.update({
				id: taskId,
				concludedAt: new Date(),
			});

			return reply.code(201).send(task);
		},
	);
}
