import { type Actions, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (username === undefined) {
			return {
				success: false,
				error: 'Provide a username'
			};
		}

		if (password === undefined) {
			return {
				success: false,
				error: 'Provide a password'
			};
		}
		const prisma = new PrismaClient();

		try {
			const user = await prisma.user.create({
				data: {
					username: username,
					password: password
				}
			});
		} catch (error) {
			return {
				success: false,
				error: 'The username is already taken'
			};
		}

		prisma.$disconnect();
		throw redirect(302, '/auth/login');
	}
};
