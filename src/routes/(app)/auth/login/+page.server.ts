import { PrismaClient } from '@prisma/client';
import { type Actions, redirect } from '@sveltejs/kit';
import * as jose from 'jose';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const prisma = new PrismaClient();

		try {
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					username: username
				}
			});

			if (user.password === password) {
				try {
					const key = new TextEncoder().encode(process.env['KEY']);
					const jwt = await new jose.SignJWT({ aud: username })
						.setProtectedHeader({ alg: 'HS256' })
						.setExpirationTime('2d')
						.setIssuedAt()
						.sign(key);

					event.cookies.set('jwt', jwt, { path: '/' , expires: new Date(Date.now() + 172800000)});
				} catch (error) {
					return {
						success: false,
						error: 'other error'
					};
				}
			} else {
				return {
					success: false,
					error: 'The password is incorrect'
				};
			}
		} catch (error) {
			return {
				success: false,
				error: 'An account with this username was not found'
			};
		}

		throw redirect(303, '/');

		prisma.$disconnect();
	}
};
