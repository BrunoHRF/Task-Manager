import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TasksService } from "../tasks-service";

const queryValidationSchema = z.object({
	projectId: z.string().uuid(),
});

export async function findTasksByProjectController(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/tasks",
		{
			schema: {
				querystring: queryValidationSchema,
			},
		},
		async (request, reply) => {
			const { projectId } = request.query;

			const tasksService = new TasksService();
			const tasks = await tasksService.findByProject(projectId);

			return reply.send(tasks)
		},
	);
}
