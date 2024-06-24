import type { FastifyInstance } from "fastify";
import { createProjectController } from "./http/create-projects-controller";
import { findProjectsByUserController } from "./http/find-projects-by-user-controller";

export async function projectsController(app: FastifyInstance) {
	app.register(createProjectController);
	app.register(findProjectsByUserController);
}
