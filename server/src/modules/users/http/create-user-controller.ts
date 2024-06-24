import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UsersService } from "../users-service";



export async function createUserController(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.post(
			"/users",
			{ schema: { body: z.object({ email: z.string().email() }) } },
			async (request, reply) => {
				const { email } = request.body;

				const usersService = new UsersService();
				const user = await usersService.create({ email });

				return reply.code(201).send(user);
			},
		);
}
