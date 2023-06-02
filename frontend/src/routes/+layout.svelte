<script>
	import '../app.css';
	import ActionLink from '$lib/ActionLink.svelte';
</script>

<div class="container mx-auto">
	<div class="flex flex-wrap flex-col-reverse sm:flex-row">
		<main class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
			<!-- content area -->
			<slot />
		</main>
		<aside class="w-full sm:w-1/3 md:w-1/4 px-2">
			<div class="sticky top-0 p-4 w-full">
				<nav
					class="flex flex-row gap-12 overflow-hidden sm:gap-6 sm:flex-col text-lg font-extrabold"
				>
					<a href="/" class="text-red-600 dark:text-cyan-500">Home</a>
					<ActionLink />
				</nav>
			</div>
		</aside>
	</div>
</div>
