<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Theme from '$lib/Theme.svelte';
	import ActionLink from '$lib/ActionLink.svelte';

	let path: string;

	$: path = $page.url.pathname;
</script>

<svelte:head>
	<title>Atomic 38x</title>
	<meta name="description" content="Build your atomic habit with NFT & become 38x after 1 year" />
</svelte:head>

<div class="container mx-auto">
	<div class="flex flex-wrap flex-col-reverse sm:flex-row">
		<main class="w-full sm:w-2/3 md:w-3/4 p-4">
			<!-- content area -->
			<slot />
		</main>
		<aside
			class="w-full border-b-2 border-stone-200 sm:border-b-0 sm:border-l-2 sm:h-screen sm:w-1/3 md:w-1/4 p-4"
		>
			<div class="sticky top-0 w-full">
				<h1 class="mb-1 text-2xl font-extrabold text-amber-700/60 dark:text-amber-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="inline-block mb-1"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						stroke-width="1"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
						<path d="M12 21l0 .01" />
						<path d="M3 9l0 .01" />
						<path d="M21 9l0 .01" />
						<path d="M8 20.1a9 9 0 0 1 -5 -7.1" />
						<path d="M16 20.1a9 9 0 0 0 5 -7.1" />
						<path d="M6.2 5a9 9 0 0 1 11.4 0" />
					</svg> Atomic 38x
				</h1>
				<p class="mb-4 text-sm font-medium text-gray-400">
					Build your atomic habit with NFT & become 38x after 1 year
				</p>
				<nav
					class="flex flex-row gap-12 overflow-hidden sm:gap-6 sm:flex-col text-lg font-extrabold"
				>
					<a
						href="/"
						class={`${
							path === '/'
								? 'text-amber-600 dark:text-amber-300'
								: 'text-gray-600 dark:text-gray-100'
						}`}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="inline w-5 h-5 mb-1"
						>
							<path
								fill-rule="evenodd"
								d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
								clip-rule="evenodd"
							/>
						</svg>

						Home</a
					>
					<ActionLink />
					<Theme />
				</nav>
			</div>
		</aside>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme('colors.slate.50');
		color: theme('colors.gray.700');
		font-family: Kanit, system-ui, sans-serif;
	}
	:global(html.dark) {
		background-color: theme('colors.neutral.800');
		color: theme('colors.gray.50');
	}
</style>
