<script>
	import { drawerStore } from '@skeletonlabs/skeleton';
	
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/">Notes</a></li>
		<li><a href="/?test=1" on:click={drawerClose}>Other Page 1</a></li>
		<li><a href="/?test=2" on:click={drawerClose}>Other Page 1</a></li>
		<li><a href="/?test=3" on:click={drawerClose}>Other Page 1</a></li>
	</ul>
</nav>
