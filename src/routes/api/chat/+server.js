import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export const POST = async ({ request }) => {
	const { messages } = await request.json();

	const response = await openai.chat.completions.create({
		model: 'gpt-4-1106-preview',
		stream: true,
		messages
	});

	const stream = OpenAIStream(response, {
		onStart: () => {
			console.log('Started');
		},
		onToken: (token) => {
			console.log('Token:', token);
		},
		onMessage: (message) => {
			console.log('Message:', message);
		},
		onCompletion: (completion) => {
			console.log('Completion:', completion);
		},
	});

	return new StreamingTextResponse(stream);
};
