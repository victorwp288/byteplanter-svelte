// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { isSupported } from 'firebase/analytics';
import { onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB8HEpdjh4WNPdW6nijP-Ylaytw6jTzYKQ',
	authDomain: 'byteplanter.firebaseapp.com',
	projectId: 'byteplanter',
	storageBucket: 'byteplanter.appspot.com',
	messagingSenderId: '927207909254',
	appId: '1:927207909254:web:f732f74f549662f1932e07',
	measurementId: 'G-EW36YYJ34G'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export let analytics;

isSupported().then((isSupported) => {
	if (isSupported) {
		analytics = getAnalytics(app);
	} else {
		console.log('Firebase Analytics is not supported in this environment');
	}
});

function userStore() {
	let unsubscribe;

	if (!auth) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();
export { createUserWithEmailAndPassword };
