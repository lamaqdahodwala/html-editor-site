import { PrismaClient } from '@prisma/client';
import { Actions, redirect } from '@sveltejs/kit';
import * as jose from 'jose';

export const actions: Actions = {
	default: async (event) => {
		let data = await event.request.formData();
		let username = data.get('username');
		let password = data.get('password');

		let prisma = new PrismaClient();

		try {
			let user = await prisma.user.findUniqueOrThrow({
				where: {
					username: username
				}
			});

			if (user.password === password) {
				try {
					let key = new TextEncoder().encode(process.env["KEY"])
					let jwt = await new jose.SignJWT({ aud: username })
						.setProtectedHeader({ alg: 'HS256' })
						.setExpirationTime('2d')
						.setIssuedAt()
						.sign(key);

					event.cookies.set('jwt', jwt);
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
