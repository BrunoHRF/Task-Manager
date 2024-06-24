import type { FastifyInstance } from "fastify";
import { createUserController } from "./http/create-user-controller";

export async function usersController(app: FastifyInstance) {
	app.register(createUserController);
}
