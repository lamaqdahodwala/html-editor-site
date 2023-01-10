import { PrismaClient } from '@prisma/client';
import { redirect, type Actions } from '@sveltejs/kit';
import * as jose from 'jose';
export const actions: Actions = {
	default: async (event) => {
		let data = event.request.formData();
		let title = String((await data).get('title'));
		let jwt = event.cookies.get('jwt');
		let key = new TextEncoder().encode(process.env['KEY']);
        let user

		if (jwt === undefined) {
			throw redirect(303, "/auth/login")
		}

        if (title === ""){
            return {
                success: false, 
                error: "Provide a title"
            }
        }

		try {
			let user = await jose.jwtVerify(jwt, key);

            // Find out if the user has a pen that already has this title 
            let prisma = new PrismaClient()
            let userdata = await prisma.user.findUniqueOrThrow({
                where: {
                    username: user.payload.aud
                }, 
                
                include: {
                    pens: {
                        select: {
                            title: true
                        }
                    }
                }
            })

            let post_titles = userdata.pens.map((val) => {val.title})

            console.log(post_titles)

            console.log(userdata)

            if (post_titles.includes(title)) {
                return {
                    success: false, 
                    error: "You already have a pen with this name"
                }
            }

            let pen = await prisma.pen.create({
                data: {
                    title: title, 
                    owner: {
                        connect: {
                            username: user.payload.aud
                        }
                    }
                }
            })

            prisma.$disconnect()

            
		} catch (error) {
            console.log(error)
            throw redirect(303, "/auth/login")
        }

        throw redirect(303, `/editor/${user.payload.aud}/${title}`)
	}
};
