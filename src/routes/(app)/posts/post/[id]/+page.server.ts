import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const prisma = new PrismaClient();

	const post = prisma.post.findUniqueOrThrow({
		where: {
			id: Number(id)
		},
		include: {
			pen: {
				select: {
					owner: {
						select: {
							username: true
						}
					},
					title: true
				}
			},
			owner: {
				select: {
					username: true,
					id: true
				}
			}
		}
	});

	return {
		post: post
	};
};
