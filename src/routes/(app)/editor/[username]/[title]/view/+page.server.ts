import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const prisma = new PrismaClient();

	const pen_user = await prisma.user.findUnique({
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

	console.log(pen_user);

	if (pen_user?.pens.length !== 1) {
		throw redirect(302, '/');
	}
	const pen = pen_user?.pens[0];

	const string = `<html>${pen.html} <script>${pen.js}</script> <style>${pen.css}</style> </html>`;
	return {
		html: pen.html,
		css: pen.css,
		js: pen.js,
		string: string
	};
};
