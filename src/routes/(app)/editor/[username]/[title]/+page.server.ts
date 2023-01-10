import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const prisma = new PrismaClient();
	try {
		const pen_data = await prisma.user.findUnique({
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

        console.log(pen_data)
        if (pen_data?.pens.length !== 1){
            throw error(404, "Not found")
        }

        let pen = pen_data.pens[0]

        return {
            username: event.params.username,
            title: event.params.title,
            html: pen.html,
            css: pen.css, 
            js: pen.js
        }

        
	} catch (e) {
		throw error(404, 'Not found');
	}
};
