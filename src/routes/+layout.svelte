<script>
	import '../app.postcss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';

	import Footer from '$lib/components/Footer.svelte';
	import { AppShell, AppBar, Avatar, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	inject({ mode: dev ? 'development' : 'production' });

	import { initializeStores } from '@skeletonlabs/skeleton';
	import { user } from '$lib/firebase';
	let initials = '';

	$: {
		if ($user) {
			if ($user.displayName) {
				let names = $user.displayName.split(' ');
				initials = names[0][0] + (names.length > 1 ? names[names.length - 1][0] : '');
			} else if ($user.email) {
				initials = $user.email[0];
			}
		}
	}

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen() {
		drawerStore.open();
	}
</script>

<Drawer>
	<Navigation />
</Drawer>
<Toast />
<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<strong class="text-xl uppercase">Byteplanter</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $user}
					<a href="/login">
						<Avatar {initials} width="w-10" background="bg-primary-500" />
					</a>
				{:else}
					<button>
						<a href="/login"> login </a>
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- Router Slot -->
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
