<script>
	import { auth, user } from '$lib/firebase';

	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword,
		signOut
	} from 'firebase/auth';
	let email = '';
	let password = '';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
			},
			body: JSON.stringify({ idToken })
		});
	}

	async function signInWithEmail() {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error('Error signing in with email and password:', error);
		}
	}

	export async function signOutSSR() {
		const res = await fetch('/api/signin', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to Byteplanter" />
</svelte:head>

<h2>Login</h2>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName || $user.email}</h2>
	<p class="text-center text-success">You are logged in</p>
	<button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
{:else}
	<div>
		<input class="text-black" bind:value={email} type="email" placeholder="Email" />
		<input class="text-black" bind:value={password} type="password" placeholder="Password" />
		<button class="btn btn-primary" on:click={signInWithEmail}>Sign in with Email</button>
	</div>
	<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
