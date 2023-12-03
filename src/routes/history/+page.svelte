<script>
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { app } from '$lib/firebase.js';
	import { getFirestore, doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	const db = getFirestore(app);

	let documentData = null;

	onMount(async () => {
		const docRef = doc(db, 'chats', '4JlXL1BUpye2xTqeC8NE');
		const docSnap = await getDoc(docRef);
		console.log(docSnap.exists() ? 'Document data:' : 'No such document!');
		if (docSnap.exists()) {
			documentData = docSnap.data();
			console.log('Document data:', docSnap.data());
		} else {
			console.log('No such document!');
		}
		console.log("doc data:", documentData);
	});
</script>

<AuthCheck>
	{#if documentData}
		<div>
			<h1>{documentData.message}</h1>
		</div>
	{:else}
		<div>Loading...</div>
	{/if}
</AuthCheck>
