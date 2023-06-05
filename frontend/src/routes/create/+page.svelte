<script lang="ts">
	import { ethers, Contract } from 'ethers';
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	import atomic38x from '$lib/Atomic38x.json';

	let goal = '';
	let loading = false;

	async function createItem() {
		const provider = new ethers.BrowserProvider(window.ethereum);
		// const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
		const signer = await provider.getSigner();
		const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, atomic38x.abi, signer);
		const tx = await contract.createItem(goal.trim());
		loading = true;
		await tx.wait();
		loading = false;
		if (tx.hash) {
			alert('Success creating item');
		} else {
			alert('Fail creating item');
		}
		goal = '';
	}
</script>

<div
	class={`${
		loading ? 'flex' : 'hidden'
	} justify-center items-center h-screen w-screen bg-gray-50/80 inset-0 absolute z-10`}
>
	<p class="text-2xl">Loading...</p>
</div>

<h2 class="text-2xl text-center font-bold mb-4">Create New Habit</h2>
<div class="max-w-sm m-auto">
	<ol class="list-decimal space-y-4 list-inside">
		<li>Start with an incredibly small habit.</li>
		<li>Increase your habit in very small ways.</li>
		<li>As you build up, break habits into chunks</li>
		<li>When you slip, get back on track quickly.</li>
		<li>Be patient. Stick to a pace you can sustain.</li>
	</ol>
	<p class="mt-2 ml-auto text-xs text-gray-500 dark:text-gray-400">
		Read this <a
			class="underline"
			href="https://jamesclear.com/habit-guide"
			target="_blank"
			rel="noopener noreferrer">post</a
		> for more details
	</p>
</div>

<div
	class="mt-8 m-auto w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 sm:max-w-md"
>
	<div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
		<textarea
			required
			placeholder="Write a comment..."
			class="w-full px-0 text-sm text-gray-900 bg-white border-0 ring-0 ring-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
			name="goal"
			id="goal"
			rows="4"
			bind:value={goal}
			maxlength="280"
		/>
	</div>
	<div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
		<button
			class="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-amber-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-amber-800"
			on:click|preventDefault={createItem}
			disabled={goal.trim().length === 0}>Create atomic38x NFT</button
		>
		<div class="flex pl-0 space-x-1 sm:pl-2">
			<div>{goal.length}/280</div>
		</div>
	</div>
</div>
