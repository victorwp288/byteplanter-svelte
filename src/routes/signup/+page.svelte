<script>
    import { auth, createUserWithEmailAndPassword } from '$lib/firebase';

    let email = '';
    let password = '';

    async function register() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            console.error(error);
        }
    }
</script>
<svelte:head>
  <title>Sign Up</title>
  <meta name="description" content="Sign Up">
</svelte:head>
<h2>Register</h2>

<div>
    <input class="text-black" type="email" bind:value={email} placeholder="Email" />
    <input class="text-black" type="password" bind:value={password} placeholder="Password" />
    <button class="btn btn-primary" on:click={register}>Register</button>
</div>