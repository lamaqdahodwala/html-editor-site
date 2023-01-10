import type { LayoutServerLoad } from './$types';
import * as jose from 'jose';
export const load: LayoutServerLoad = async (event) => {
	const jwt = event.cookies.get('jwt');

	if (jwt === undefined) {
		return {
			logged_in: false,
			user: null
		};
	}

	try {
		const decoded = await jose.jwtVerify(jwt, new TextEncoder().encode(process.env['KEY']));

		return {
			logged_in: true,
			user: decoded.payload.aud
		};
	} catch (error) {
		return {
			logged_in: false,
			user: null
		};
	}
};
