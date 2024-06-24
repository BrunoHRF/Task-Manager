import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { projectsController } from "./modules/projects/projects-controller";
import { tasksController } from "./modules/tasks/tasks-controller";
import { usersController } from "./modules/users/users-controller";

export const app = fastify();
app.register(usersController);
app.register(projectsController);
app.register(tasksController);
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
