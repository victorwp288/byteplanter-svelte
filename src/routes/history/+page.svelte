<script>
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { app } from '$lib/firebase.js';
	import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { user } from '$lib/firebase';

	const db = getFirestore(app);

	let documentsData = [];

	onMount(async () => {
		if ($user) {
			console.log('uid', $user.uid);
			console.log('displayName', $user.displayName);
			// Update the query to include orderBy
			const q = query(
				collection(db, 'chats'),
				where('uid', '==', $user.uid),
				orderBy('time') // Order by time field
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, ' => ', doc.data());
				documentsData = [...documentsData, doc.data()];
			});
			console.log('documents data:', documentsData);
		}
	});
</script>

<svelte:head>
	<title>History</title>
	<meta name="description" content="Log of chats" />
</svelte:head>
<AuthCheck>
	{#if documentsData.length}
		{#each documentsData as documentData}
			<div>
				<h1>{documentData.chat}</h1>
				<br />
			</div>
		{/each}
	{:else}
		<div>Loading...</div>
	{/if}
</AuthCheck>
