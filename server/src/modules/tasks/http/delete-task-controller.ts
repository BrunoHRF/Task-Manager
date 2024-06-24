import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { z } from "zod";
import { TasksService } from "../tasks-service";

const paramsValidationSchema = z.object({
	taskId: z.string().uuid(),
});

export async function deleteTaskController(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		"/tasks/:taskId",
		{
			schema: {
				params: paramsValidationSchema,
			},
		},
		async (request, reply) => {
			const { taskId } = request.params;

			const tasksService = new TasksService();
			await tasksService.delete(taskId);

			return reply.code(204).send();
		},
	);
}
