<script lang="ts">
	import { ethers, Contract, isError } from 'ethers';
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	import Atomic37x from '$lib/Atomic37x.json';

	async function getMyList() {
		// const provider = new ethers.BrowserProvider(window.ethereum);
		let returnList = [];
		const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

		const signer = await provider.getSigner();

		const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, Atomic37x.abi, signer);
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
			const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

			const signer = await provider.getSigner();
			const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, Atomic37x.abi, signer);
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

<h1>title</h1>
{#await myList then list}
	<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each list as item}
			<div>
				<div>{item.name}</div>
				<div>{item.description}</div>
				<img src={item.image} alt="NFT" />
				<button on:click|preventDefault={() => train(item.tokenId)}>train</button>
			</div>
		{:else}
			<div>no nfts</div>
		{/each}
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}
