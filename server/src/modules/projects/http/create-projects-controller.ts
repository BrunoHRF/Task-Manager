import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProjectsService } from "../projects-service";
import { z } from "zod";

const bodyValidationSchema = z.object({
	description: z.string(),
	name: z.string(),
	startDate: z.coerce.date(),
	userId: z.string(),
});

export async function createProjectController(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/projects",
		{
			schema: {
				body: bodyValidationSchema,
			},
		},
		async (request, reply) => {
			const { description, name, startDate, userId } = request.body;

			const projectsService = new ProjectsService();
			const project = await projectsService.create({
				description,
				name,
				startDate,
				userId,
			});

			return reply.send(project);
		},
	);
}
