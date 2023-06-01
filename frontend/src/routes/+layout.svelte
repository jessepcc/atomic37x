<script>
	import '../app.css';
</script>

<div class="container mx-auto">
	<div class="flex flex-row flex-wrap py-4">
		<main class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
			<!-- content area -->
			<slot />
		</main>
		<aside class="w-full sm:w-1/3 md:w-1/4 px-2">
			<div class="sticky top-0 p-4 w-full">
				<nav class="flex flex-col overflow-hidden">
					<a href="/">Home</a>
					<a href="/create">Create</a>
				</nav>
			</div>
		</aside>
	</div>
</div>
