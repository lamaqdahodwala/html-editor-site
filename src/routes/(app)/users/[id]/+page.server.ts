import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
export const load: PageServerLoad = async (event) => {
	let user_id = Number(event.params.id);
	let prisma = new PrismaClient();

	try {
		let user = await prisma.user.findUnique({
			where: {
				id: user_id
			},

			include: {
				pens: {
					select: {
						title: true
					}
				},
				posts: {
					select: {
						title: true,
                        id: true
					}
				}
			}
		});
		delete user?.password;

		return {
			profile: user
		};
	} catch (e) {
		console.log(e);
		throw error(404, 'User was not found');
	}
};
