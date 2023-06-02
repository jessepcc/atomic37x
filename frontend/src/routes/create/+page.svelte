<script lang="ts">
	import { ethers, Contract } from 'ethers';
	import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';
	import Atomic37x from '$lib/Atomic37x.json';

	let goal = '';

	async function createItem() {
		// const provider = new ethers.BrowserProvider(window.ethereum);
		const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
		const signer = await provider.getSigner();
		const contract = new Contract(PUBLIC_CONTRACT_ADDRESS, Atomic37x.abi, signer);
		const tx = await contract.createItem(goal.trim());
		await tx.wait();
	}
</script>

<div>Create</div>

<label for="title">Title</label>
<textarea name="title" id="title" bind:value={goal} maxlength="280" />
<div>{goal.length}/280</div>

<button on:click|preventDefault={createItem} disabled={goal.trim().length === 0}>add</button>
