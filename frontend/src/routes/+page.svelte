<script lang="ts">
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	import { ethers, Contract, isError } from 'ethers';
	import Atomic37x from '$lib/Atomic37x.json';

	async function getList() {
		let returnList = [];
		const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

		const signer = await provider.getSigner();

		const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, Atomic37x.abi, signer);

		const total = await contract.totalSupply();

		for (let i = 0; i < total; i++) {
			const tx = await contract.tokenByIndex(i);
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

{#await allList then list}
	<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each list as item}
			<div>
				<div>{item.name}</div>
				<div>{item.description}</div>
				<img src={item.image} alt="NFT" />
			</div>
		{:else}
			<div>no nfts</div>
		{/each}
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}
