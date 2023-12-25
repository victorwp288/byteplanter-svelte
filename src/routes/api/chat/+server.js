import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_KEY } from '$env/static/private';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '$lib/firebase';
import { adminAuth } from '$lib/server/admin';

const db = getFirestore(app);
const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export const POST = async ({ request, cookies }) => {
	const { message } = await request.json();

	const sessionCookie = cookies.get('__session');

	const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    const userId = decodedClaims.uid ?? 'Anonymous';
	const userName = decodedClaims.name ?? 'Anonymous';

	
	
	const response = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'Give mysql data that is fake but sounds real. For example, if I ask for a list of users, give me a list of users that sounds real but is fake.'
			}
		],
		model: 'gpt-4-1106-preview',
		stream: true,
		message
	});

	const stream = OpenAIStream(response, {
		onStart: () => {
			console.log('Started');
		},
		onCompletion: async (completion) => {
			try {
				const docRef = await addDoc(collection(db, 'chats'), {
					chat: completion,
					time: new Date().toISOString(),
					name: userName,
					uid: userId,
				});
				console.log('Document written with ID: ', docRef.id);
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		}
	});

	return new StreamingTextResponse(stream);
};
