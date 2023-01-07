import { PrismaClient } from '.prisma/client';
import { Actions } from '@sveltejs/kit';
import * as jose from 'jose'
export const actions: Actions = {
	default: async (event) => {
		let data = await event.request.formData();
		let username = data.get('username');
		let password = data.get('password');

		let prisma = new PrismaClient();

		try {
			let user = await prisma.user.findUniqueOrThrow({
				where: {
					username: username
				}
			});

            if (user.password === password){
                let jwt = await jose.SignJWT({
                    
                })
            } else {
                return {
                    success: false, 
                    error: "The password is incorrect"
                }
            }
		} catch (error) {
			return {
				success: false,
				error: 'An account with this username was not found'
			};
		}

        prisma.$disconnect()

        


	}
};
