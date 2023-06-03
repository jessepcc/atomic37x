<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Theme from '$lib/Theme.svelte';
	import ActionLink from '$lib/ActionLink.svelte';

	let path: string;

	$: path = $page.url.pathname;
</script>

<div class="container mx-auto">
	<div class="flex flex-wrap flex-col-reverse sm:flex-row">
		<main class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
			<!-- content area -->
			<slot />
		</main>
		<aside
			class="w-full border-b-2 border-stone-200 sm:border-l-2 sm:h-screen sm:w-1/3 md:w-1/4 px-2"
		>
			<div class="sticky top-0 p-4 w-full">
				<h1 class="text-2xl font-extrabold text-amber-700/60 dark:text-amber-400">Atomic 37x</h1>
				<p class="mb-2 text-sm text-gray-500">
					Build your atomic habit with NFT & become 37x after 1 year
				</p>
				<Theme />
				<nav
					class="flex flex-row gap-12 overflow-hidden sm:gap-6 sm:flex-col text-lg font-extrabold"
				>
					<a href="/" class={`${path === '/' ? 'text-red-600' : 'text-gray-800'}`}>Home</a>
					<ActionLink />
				</nav>
			</div>
		</aside>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme('colors.slate.50');
		color: theme('colors.gray.700');
	}
	:global(html.dark) {
		background-color: theme('colors.slate.800');
		color: theme('colors.gray.50');
	}
</style>
