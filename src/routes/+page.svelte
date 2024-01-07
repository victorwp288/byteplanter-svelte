<script>
	import { useChat } from 'ai/svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Markdown from 'svelte-markdown';
	import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { user } from '$lib/firebase';

	const idToken = writable(''); // Initialize the writable store

	// When the component mounts, set up an observer for auth changes

	const { messages, handleSubmit, input } = useChat();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Seed your database" />
</svelte:head>
{#if !$user}
	<h1>Welcome to Byteplanter</h1>
	<h2>The ultimate way to seed your database</h2>
	<h3>If your confused about how to get started, check the FAQ!</h3>
	<p>Sign in to get started</p>
{:else}
	<h1>Ask our ai below</h1>
	<ul>
		{#each $messages as message}
			<li>{message.role} says... <Markdown source={message.content} /></li>
		{/each}
	</ul>
	<div class="absolute bottom-14 flex items-center justify-center">
		<form on:submit|preventDefault={handleSubmit} class="w-full md:w-1/2">
			<div class="flex">
				<input bind:value={$input} class="text-black rounded-xl" />
				<button class="pl-4">Send</button>
			</div>
		</form>
	</div>
{/if}
