import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

import * as jose from 'jose';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async (event) => {
	let prisma = new PrismaClient();

	let jwt = String(event.cookies.get('jwt'));

	let decoded: jose.JWTVerifyResult;

	try {
		decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));
		let username = String(decoded.payload.aud);

		let user = await prisma.user.findUnique({
			where: {
				username: username
			},
			include: {
				pens: {
					select: {
						title: true
					}
				}
			}
		});

        return {
            pens: user?.pens
        }
	} catch (error) {
		return {
			pens: null
		};
	}
};
