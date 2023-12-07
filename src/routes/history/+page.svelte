<script>
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import { app } from '$lib/firebase.js';
    import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { user } from '$lib/firebase';

    const db = getFirestore(app);

    let documentsData = [];

    onMount(async () => {
        if ($user) {
            console.log('uid', $user.uid);
            console.log('displayName', $user.displayName);
            const q = query(collection(db, 'chats'), where('uid', '==', $user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
                documentsData = [...documentsData, doc.data()]; // This line is changed
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
				<br/>
            </div>
        {/each}
    {:else}
        <div>Loading...</div>
    {/if}
</AuthCheck>