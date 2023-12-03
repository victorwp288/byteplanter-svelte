import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	try {
		const { idToken } = await request.json();
		const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
		const decodedIdToken = await adminAuth.verifyIdToken(idToken);

		if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
			const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
			const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

			cookies.set('__session', cookie, options);

			return json({ status: 'signedIn' });
		} else {
			throw error(401, 'Recent sign in required!');
		}
	} catch (err) {
		console.error(err);
		throw error(500, 'Internal Server Error, lol + skill issue' + err);
	}
};

export const DELETE = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
