import { Prisma, PrismaClient } from '@prisma/client';
import { error, redirect, type Actions } from '@sveltejs/kit';
import * as jose from 'jose';
import type { PageServerLoad } from './$types';
export const actions: Actions = {
	default: async (event) => {
		const jwt = event.cookies.get('jwt');
		let decoded
		try {
			decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));
		} catch (error) {
			console.log(error);
			throw redirect(302, '/auth/login');
		}
		const prisma = new PrismaClient();

		const data = await event.request.formData();

		console.log(data.get('pen_title'));

		const title = data.get('title');
		const content = data.get('content');
		const pen_title = data.get('pen_title');

		const user = await prisma.user.findUnique({
			where: {
				username: decoded.payload.aud
			},
			include: {
				pens: {
					where: {
						title: pen_title
					},
					include: {
						owner: {
							select: {
								username: true
							}
						}
					}
				}
			}
		});

		if (user.pens.length !== 1) {
			throw error(500, 'Error');
		}

		const pen = user.pens[0];

		if (decoded.payload.aud !== pen.owner.username) {
			throw error(403, 'Not authorized');
		}

		let post_id
		try {
			const post = await prisma.post.create({
				data: {
					title: title,
					content: content,
					pen: {
						connect: {
							id: pen.id
						}
					},
					owner: {
						connect: {
							username: decoded.payload.aud
						}
					}
				}
			});

			post_id = post.id
		} catch (error) {
			return {
				success: false,
				error: 'A post with this name already exists'
			};
		}

		throw redirect(302, `/posts/post/${post_id}`)

		
	}
};
export const load: PageServerLoad = async (event) => {
	const jwt = event.cookies.get('jwt');
	if (jwt === undefined) {
		console.log('redirect here');
		throw redirect(302, '/auth/login');
	}
	try {
		const decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));

		const username = decoded.payload.aud;

		const prisma = new PrismaClient();

		const pen_titles = await prisma.user.findUnique({
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
			titles: pen_titles.pens
		};
	} catch (error) {
		console.log(error);
		throw redirect(302, '/auth/login');
	}
};
