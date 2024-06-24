import type { Prisma, Tasks } from "@prisma/client/edge";
import { prisma } from "../../lib/prisma";

export class TasksService {
	async create({
		description,
		title,
		concludedAt,
		id,
		projectId,
	}: Prisma.TasksUncheckedCreateInput): Promise<Tasks> {
		const task = await prisma.tasks.create({
			data: { description, title, concludedAt, id, projectId },
		});

		return task;
	}

	async update({
		concludedAt,
		description,
		id,
		projectId,
		title,
	}: Prisma.TasksUncheckedUpdateInput): Promise<Tasks> {
		const taskExists = await prisma.tasks.findUnique({
			where: { id: String(id) },
		});
		if (!taskExists) throw new Error("Task not found");

		const task = await prisma.tasks.update({
			where: { id: taskExists.id },
			data: { concludedAt, description, projectId, title },
		});

		return task;
	}

	async findByProject(projectId: string): Promise<Tasks[]> {
		const tasks = await prisma.tasks.findMany({ where: { projectId } });

		return tasks;
	}

	async delete(id: string): Promise<void> {
		const taskExists = await prisma.tasks.findUnique({
			where: { id: String(id) },
		});
		if (!taskExists) throw new Error("Task not found");

		await prisma.tasks.delete({ where: { id } });
	}
}
