import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import { GCP_PROJECT_ID, GCP_SERVICE_ACCOUNT_EMAIL, GCP_PRIVATE_KEY } from '$env/static/private';

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: GCP_PROJECT_ID,
			clientEmail: GCP_SERVICE_ACCOUNT_EMAIL,
			privateKey: GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
		}),
		databaseURL: 'https://chats.firebaseio.com'
	});
}

export default admin;

export const adminDB = getFirestore();
export const adminAuth = getAuth();
