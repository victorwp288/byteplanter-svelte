<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/">Notes</a></li>
		<li><a href="/contact" on:click={drawerClose}>Contact</a></li>
		<li><a href="/faq" on:click={drawerClose}>FAQ</a></li>	</ul>
</nav>
