<script lang="ts">
	import { ethers, Contract, isError } from 'ethers';
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	import atomic38x from '$lib/atomic38x.json';

	async function getMyList() {
		let returnList = [];
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();

		const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, atomic38x.abi, signer);
		const address = await signer.getAddress();

		// check if address is owner
		const ownerBalance = await contract.balanceOf(address);
		if (ownerBalance.toString() === '0') {
			throw new Error('You are not the owner of any NFTs');
		}
		for (let i = 0; i < ownerBalance; i++) {
			const tx = await contract.tokenOfOwnerByIndex(address, i);
			const metaData = await contract.tokenURI(tx);
			const meta = atob(metaData.split(',')[1]).toString();
			const parsed = JSON.parse(meta);
			returnList.push({ tokenId: tx, ...parsed });
		}
		return returnList;
	}

	async function train(tokenId: string) {
		console.log('taine ', tokenId);
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, atomic38x.abi, signer);
			const tx = await contract.train(tokenId);
			await tx.wait();
		} catch (error) {
			if (isError(error, 'CALL_EXCEPTION')) {
				// The Type Guard has validated this object
				console.log(error.data);
				window.alert(error.reason);
			} else {
				window.alert('Failed');
			}
		}
	}

	let myList = getMyList();
</script>

<h2 class="text-2xl text-center font-bold mb-4">My Atomic Habit</h2>
<p class="text-center mb-8">Keep it up!</p>
{#await myList then list}
	<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each list as item}
			<div class="relative rounded-xl shadow-sm overflow-clip">
				<img src={item.image} alt="NFT" />
				<div class="g-container absolute flex inset-0 bg-transparent hover:bg-zinc-50/80">
					<button
						class="g-btn transition-opacity ease-in delay-50 opacity-0 items-center m-auto justify-center py-2.5 px-4 text-sm font-medium text-center text-white bg-amber-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-amber-700"
						on:click|preventDefault={() => train(item.tokenId)}>Record Progress</button
					>
				</div>
			</div>
		{:else}
			<div class="text-center">no nfts</div>
		{/each}
	</div>
{:catch error}
	<p class="text-center text-sm">{error.message}</p>
{/await}

<style>
	.g-container:hover .g-btn {
		opacity: 1;
	}
</style>
