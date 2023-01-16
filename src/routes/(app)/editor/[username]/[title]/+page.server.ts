import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as jose from 'jose';

export const load: PageServerLoad = async (event) => {
	const prisma = new PrismaClient();

	try {
		const jwt = event.cookies.get('jwt');
		let user: string | null;
		if (jwt === undefined) {
			user = null;
		}

		try {
			const decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));
			user = decoded.payload.aud;
		} catch (error) {
			user = null;
		}

		const pen_data = await prisma.user.findUnique({
			where: {
				username: event.params.username
			},
			include: {
				pens: {
					where: {
						title: event.params.title
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

		console.log(pen_data);
		if (pen_data?.pens.length !== 1) {
			throw error(404, 'Not found');
		}

		const pen = pen_data.pens[0];

		const here = event.url;

		return {
			username: event.params.username,
			title: event.params.title,
			html: pen.html,
			css: pen.css,
			js: pen.js,
			is_owner: user === pen.owner.username ? true : false,
			here: here.href
		};
	} catch (e) {
		throw error(404, 'Not found');
	}
};
