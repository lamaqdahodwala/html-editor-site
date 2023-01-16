import type { LayoutServerLoad } from './$types';
import * as jose from 'jose';
import { PrismaClient } from '@prisma/client';
export const load: LayoutServerLoad = async (event) => {
	const jwt = event.cookies.get('jwt');

	if (jwt === undefined) {
		return {
			logged_in: false,
			user: null
		};
	}

	try {
		const decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));

		let prisma = new PrismaClient()

		let user = await prisma.user.findUnique({
			where: {
				username: String(decoded.payload.aud)
			}, 
			select: {
				id: true
			}
		})

		return {
			logged_in: true,
			user: decoded.payload.aud,
			user_id: user?.id
		};
	} catch (error) {
		return {
			logged_in: false,
			user: null
		};
	}
};
