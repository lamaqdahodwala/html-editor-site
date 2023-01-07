import { Actions, redirect } from "@sveltejs/kit";
import {PrismaClient} from '@prisma/client'
export const actions: Actions = {
    default: async(event) => {
        let data = await event.request.formData()
        let username = data.get("username")
        let password = data.get('password')

        let prisma = new PrismaClient()

        let user = await prisma.user.create({
            data: {
                username: username, 
                password: password
            }
        })

        return redirect(302, "/auth/login")
    }    
};