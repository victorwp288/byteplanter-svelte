//TODO: implement this

/*import OpenAI from 'openai';
import { OPENAI_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export const POST = async ({ request }) => {
	const { beskeder } = await request.json();

	const assistant = await openai.beta.assistants.create({
		name: 'Data visualizer',
		instructions: 'Your job is to only output mysql queries, with fake but real sounding data',
		model: 'gpt-4-1106-preview'
	});

	const thread = await openai.beta.threads.create();

	const message = await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: 'I need 10 rows of first names'
	});
	const messages = await openai.beta.threads.messages.list(thread.id);

	
};*/
