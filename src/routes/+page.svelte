<script>
	import { useChat } from 'ai/svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Markdown from 'svelte-markdown';

	const { messages, handleSubmit, input } = useChat();


	
</script>
<svelte:head>
  <title>Home</title>
  <meta name="description" content="Seed your database">
</svelte:head>
<AuthCheck>
	<h1>Ask our ai below</h1>
	<ul>
		{#each $messages as message}
			<li>{message.role} says... <Markdown source={message.content} /></li>
		{/each}
	</ul>

	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value={$input} class="text-black" />
		<button>Send</button>
	</form>
</AuthCheck>
