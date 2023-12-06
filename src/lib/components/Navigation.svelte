<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	$: classesActive = (href) => (href === $page.url.pathname ? '!bg-primary-500' : '');

	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li>
			<a href="/" class={classesActive('/')} on:click={drawerClose}>
				<span class="badge bg-primary-500">(icon)</span>
				<span class="flex-auto">Home</span>
			</a>
		</li>
		<li>
			<a href="/contact" class={classesActive('/contact')} on:click={drawerClose}>
				<span class="badge bg-primary-500">(icon)</span>
				<span class="flex-auto">Contact</span>
			</a>
		</li>
		<li>
			<a href="/faq" class={classesActive('/faq')} on:click={drawerClose}>
				<span class="badge bg-primary-500">(icon)</span>
				<span class="flex-auto">FAQ</span>
			</a>
		</li>
	</ul>
</nav>
