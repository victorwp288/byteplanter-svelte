import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export const POST = async ({ request }) => {
	const { messages } = await request.json();

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages
	});

	const stream = OpenAIStream(response);

	return new StreamingTextResponse(stream);
};