<script>
	import { ethers, Contract } from 'ethers';
	import Atomic37x from './Atomic37x.json';

	async function createItem() {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const DEPLOYED_ADDRESS = '0x591A13B11B16889c346F3310e9fd1D22Ab47eCd9';
		const contract = new Contract(DEPLOYED_ADDRESS, Atomic37x.abi, signer);
		console.log('start');
		const tx = await contract.createItem();
		await tx.wait();
		console.log('end');
	}
</script>

<div>Create</div>
<button on:click|preventDefault={createItem}>add</button>
