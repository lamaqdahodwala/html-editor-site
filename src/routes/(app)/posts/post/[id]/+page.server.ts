import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    let id = event.params.id

    let prisma = new PrismaClient()

    prisma.post.findUniqueOrThrow({
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
                    username: true
                }
            }
        }
    })
};