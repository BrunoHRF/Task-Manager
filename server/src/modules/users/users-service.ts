import type { Prisma, Users } from "@prisma/client/edge";
import { prisma } from "../../lib/prisma";

export class UsersService {
	async create({
		email,
		createdAt,
		id,
		projects,
	}: Prisma.UsersCreateInput): Promise<Users> {
		const user = await prisma.users.create({
			data: { email, createdAt, id, projects },
		});

		return user;
	}
	async findById(id: string): Promise<Users | null> {
		const user = await prisma.users.findUnique({ where: { id } });

		return user;
	}
	async findByEmail(email: string): Promise<Users | null> {
		const user = await prisma.users.findUnique({ where: { email } });

		return user;
	}
}
