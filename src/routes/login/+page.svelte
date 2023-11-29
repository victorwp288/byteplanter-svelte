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
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}

	async function signInWithEmail(email, password) {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			console.log(user);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<h2>Login</h2>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}</h2>
	<p class="text-center text-success">You are logged in</p>
	<button class="btn btn-warning" on:click={() => signOut(auth)}>Sign out</button>
{:else}
	<div>
		<input type="email" bind:value={email} placeholder="Email" />
		<input type="password" bind:value={password} placeholder="Password" />
		<button class="btn btn-primary" on:click={() => signInWithEmail(email, password)}
			>Sign in with Email</button
		>
	</div>
	<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
