import type { FastifyInstance } from "fastify";
import { concludeTaskController } from "./http/conclude-task-controller";
import { createTaskController } from "./http/create-task-controller";
import { deleteTaskController } from "./http/delete-task-controller";
import { findTasksByProjectController } from "./http/find-tasks-by-project-controller";

export async function tasksController(app: FastifyInstance) {
	app.register(concludeTaskController);
	app.register(deleteTaskController);
	app.register(findTasksByProjectController);
	app.register(createTaskController);
}
