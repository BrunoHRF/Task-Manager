import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { ProjectsService } from "../projects-service";

const paramsValidationScheam = z.object({ userId: z.string().uuid() });

export async function findProjectsByUserController(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.get(
			"/projects/:userId",
			{ schema: { params: paramsValidationScheam } },
			async (request, reply) => {
				const { userId } = request.params;

				const projectsService = new ProjectsService();
				const projects = await projectsService.findManyByUser(userId);

				return reply.send(projects);
			},
		);
}
