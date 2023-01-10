import { PrismaClient } from '@prisma/client';
import { redirect, type Actions } from '@sveltejs/kit';
import * as jose from 'jose';
export const actions: Actions = {
	default: async (event) => {
		const data = event.request.formData();
		const title = String((await data).get('title'));
		const jwt = event.cookies.get('jwt');
		const key = new TextEncoder().encode(process.env['KEY']);

		if (jwt === undefined) {
			throw redirect(303, '/auth/login');
		}

		if (title === '') {
			return {
				success: false,
				error: 'Provide a title'
			};
		}
		let user;
		try {
			user = await jose.jwtVerify(jwt, key);
		} catch (error) {
			throw redirect(303, '/auth/login');
		}

		try {
			// Find out if the user has a pen that already has this title
			const prisma = new PrismaClient();
			const userdata = await prisma.user.findUniqueOrThrow({
				where: {
					username: user.payload.aud
				},

				include: {
					pens: {
						select: {
							title: true
						}
					}
				}
			});

			const post_titles = userdata.pens.map((val) => {
				return val.title;
			});

			console.log(post_titles);

			if (post_titles.includes(title)) {
				return {
					success: false,
					error: 'You already have a pen with this name'
				};
			}

			const pen = await prisma.pen.create({
				data: {
					title: title,
					owner: {
						connect: {
							username: user.payload.aud
						}
					}
				}
			});

			prisma.$disconnect();
		} catch (error) {
			console.log(error);
			throw redirect(303, '/auth/login');
		}

		throw redirect(303, `/editor/${user.payload.aud}/${title}`);
	}
};
