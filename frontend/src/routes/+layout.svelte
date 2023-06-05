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
				<p class=" text-sm font-medium text-gray-400">
					Build your atomic habit with NFT & become 38x after 1 year
				</p>
				<div class="my-2 flex gap-2">
					<a
						class="text-gray-700 transition hover:text-gray-700/75"
						href="https://twitter.com/jessepcc"
						target="_blank"
						rel="noreferrer"
					>
						<span class="sr-only"> Twitter </span>

						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
							/>
						</svg>
					</a>
					<a
						class="text-gray-700 transition hover:text-gray-700/75"
						href="https://github.com/jessepcc/atomic38x"
						target="_blank"
						rel="noreferrer"
					>
						<span class="sr-only"> GitHub </span>

						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
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
