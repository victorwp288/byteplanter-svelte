import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_KEY } from '$env/static/private';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '$lib/firebase';
import { adminAuth } from '$lib/server/admin';

const auth = getAuth(app);
const db = getFirestore(app);
const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export const POST = async ({ request }) => {
	const { message } = await request.json();



	const response = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'output only short javascript snippets, but take in mind the next message and abide by the user'
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
					name: adminAuth.currentUser?.displayName ?? 'Anonymous'
				});
				console.log('Document written with ID: ', docRef.id);
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		}
	});

	return new StreamingTextResponse(stream);
};
