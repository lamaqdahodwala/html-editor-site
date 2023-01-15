import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    let prisma = new PrismaClient()

    let posts = await prisma.post.findMany({
        orderBy: {
            id: "desc"
        }, 
        take: 10,
        include: {
            owner: {
                select: {
                    username: true
                }
            }
        }
    })

    return {
        posts: posts
    }
};