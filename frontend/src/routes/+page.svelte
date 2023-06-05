<script lang="ts">
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	import { ethers, Contract, isError } from 'ethers';
	import atomic38x from '$lib/Atomic38x.json';

	async function getList() {
		let returnList = [];
		const provider = new ethers.BrowserProvider(window.ethereum);
		// const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

		const signer = await provider.getSigner();

		const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, atomic38x.abi, signer);

		const total = await contract.totalSupply();

		for (let i = 0; i < total; i++) {
			const tx = await contract.tokenByIndex(i);
			2;
			const metaData = await contract.tokenURI(tx);
			const meta = atob(metaData.split(',')[1]).toString();
			const parsed = JSON.parse(meta);
			// console.log(parsed);
			returnList.push(parsed);
		}
		return returnList;
	}

	let allList = getList();
</script>

<h2 class="text-2xl text-center font-bold mb-4">Atomic38x NFTs</h2>

<div class="m-auto p-4 max-w-lg rounded-md">
	<p class="mb-4">
		Build <a class="underline" href="https://jamesclear.com/atomic-habits" target="_blank">
			atomic habits
		</a> with NFTs. Check in daily to update your NFTs. All data, including the image, is stored on the
		blockchain.
	</p>
	<img
		src="https://jamesclear.com/wp-content/uploads/2014/07/tiny-gains.jpg"
		alt="Jame Clear Atomic Habit 38x"
	/>
	<p class="text-xs text-gray-300">
		image from

		<a href="https://jamesclear.com/wp-content/uploads/2014/07/tiny-gains.jpg" target="_blank"
			>this blog post</a
		> in jamesclear.com
	</p>
</div>
{#await allList then list}
	<h2 class="text-xl text-center font-bold my-4">All NFTs</h2>
	{#each list as item}
		<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
			<img src={item.image} alt="NFT" class="rounded-xl shadow-sm" />
		</div>
	{:else}
		<p class="text-center text-sm">no items</p>
	{/each}
{:catch error}
	<p>{error.message}</p>
{/await}
