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
	const { messages } = await request.json();

	const sessionCookie = cookies.get('__session');

	const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);

	console.log(messages);
	const response = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'Give mysql data that is fake but sounds real. For example, if I ask for a list of users, give me a list of users that sounds real but is fake.'
			},
			...messages.map((message) => ({
				role: 'user',
				content: message.content
			}))
		],
		model: 'gpt-4-1106-preview',
		stream: true
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
					name: decodedClaims.name ?? 'Anonymous',
					uid: decodedClaims.uid ?? 'Anonymous'
				});
				console.log('Document written with ID: ', docRef.id);
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		}
	});

	return new StreamingTextResponse(stream);
};
