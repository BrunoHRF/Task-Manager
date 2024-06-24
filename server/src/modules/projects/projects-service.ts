import type { Prisma, Projects } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class ProjectsService {
	async create({
		description,
		name,
		startDate,
		createdAt,
		id,
		userId,
	}: Prisma.ProjectsUncheckedCreateInput): Promise<Projects> {
		const project = await prisma.projects.create({
			data: { description, name, startDate, createdAt, id, userId },
		});

		return project;
	}

	async findManyByUser(userId: string): Promise<Projects[]> {
		const projects = await prisma.projects.findMany({ where: { userId } });

		return projects;
	}
}
