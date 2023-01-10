import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';
import * as jose from 'jose';
export const POST: RequestHandler = async (event) => {
	const jwt = event.cookies.get('jwt');

	try {
		const decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));

		if (decoded.payload.aud !== event.params.username) {
			return json({
				success: false,
				error: 'Not authorized'
			});
		}

		const prisma = new PrismaClient();

		const user_pen = await prisma.user.findUnique({
			where: {
				username: event.params.username
			},
			include: {
				pens: {
					where: {
						title: event.params.title
					}
				}
			}
		});

		if (user_pen?.pens.length !== 1) {
			return json({
				sucess: false,
				error: "The pen doesn't exist"
			});
		}
		const pen = user_pen?.pens[0];

		const data = await event.request.json();

		const html = data['html'];
		const css = data['css'];
		const js = data['js'];

		const new_pen = await prisma.pen.update({
			where: {
				id: pen.id
			},
			data: {
				html: html,
				css: css,
				js: js
			}
		});

		return json({
			success: true,
			error: null
		});
	} catch (error) {
		return json({
			success: false,
			error: 'Not logged in'
		});
	}

	return new Response();
};
