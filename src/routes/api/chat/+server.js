import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export const POST = async ({ request }) => {
	const { message } = await request.json();

	const response = await openai.chat.completions.create({
		messages: [{"role": "system", "content": "Your job is to only output mysql queries, with fake but real sounding data"}],
		model: 'gpt-4-1106-preview',
		stream: true,
		message
	});

	const stream = OpenAIStream(response, {
		onStart: () => {
			console.log('Started');
		},
		onToken: () => {
			console.log('Token:');
		},
		onMessage: (message) => {
			console.log('Message:', message);
		},
		onCompletion: (completion) => {
			console.log('Completion:', completion);
		}
	});

	return new StreamingTextResponse(stream);
};
