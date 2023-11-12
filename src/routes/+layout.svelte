<script>
	import '../app.postcss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
