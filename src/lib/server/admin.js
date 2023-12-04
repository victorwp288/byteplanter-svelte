import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';
import firebase from 'firebase-admin';
import serviceAccount from './service-account.json';

const getGCPCredentials = () => {
	return process.env.GCP_PRIVATE_KEY
		? {
				projectId: process.env.GCP_PROJECT_ID,
				clientEmail: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
				privateKey: process.env.GCP_PRIVATE_KEY
		  }
		: {};
};

firebase.initializeApp({
	credential: firebase.credential.cert(getGCPCredentials()),
	databaseURL: 'https://chats.firebaseio.com'
});

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY
		})
	});
} catch (err) {
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
