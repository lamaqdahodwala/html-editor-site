import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const prisma = new PrismaClient()
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
    })
};