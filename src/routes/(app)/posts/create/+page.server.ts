import { Prisma, PrismaClient } from '@prisma/client';
import { error, redirect, type Actions } from '@sveltejs/kit';
import * as jose from 'jose';
import type { PageServerLoad } from './$types';
export const actions: Actions = {
	default: async (event) => {
		let jwt = event.cookies.get('jwt');
		try {
			let decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));

			let prisma = new PrismaClient();

			let data = await event.request.formData();

			let title = data.get('title');
			let content = data.get('content');
			let pen_title = data.get('pen_title');

			let user = await prisma.user.findUnique({
				where: {
					username: decoded.payload.aud
				},
				include: {
					pens: {
						where: {
							title: pen_title
						}
					}
				}
			});

			if (user.pens.length !== 1) {
				throw error(500, 'Error');
			}

			let pen = user.pens[0];

			if (decoded.payload.aud !== pen.owner.username) {
				throw error(403, 'Not authorized');
			}

			let post = await prisma.post.create({
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

			return {
				success: true,
				error: null
			};
		} catch (error) {
			throw redirect(302, '/auth/login');
		}
	}
};
export const load: PageServerLoad = async (event) => {
	let jwt = event.cookies.get('jwt');
	try {

		if (jwt === undefined){
			throw new Error()
		}
		let decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));

        let username = decoded.payload.aud

        let  prisma = new PrismaClient()

        let pen_titles = await prisma.user.findUnique({
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
        })

        
	} catch (error) {
        throw redirect(302, "/auth/login")
    }
};
