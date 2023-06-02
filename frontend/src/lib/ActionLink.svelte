<script lang="ts">
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	let signer: ethers.Signer;

	onMount(async () => {
		console.log('onMount');
		if (window && window !== undefined && window.ethereum) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			signer = await provider.getSigner();
		}
	});
</script>

{#if signer}
	<a href="/create">Create</a>
	<a href="/mine">Mine</a>
{:else}
	<p>
		{' '}
		🦊{' '}
		<a target="_blank" href={`https://metamask.io/download.html`}>
			You must install Metamask, a virtual Ethereum wallet, in your browser.
		</a>
	</p>
{/if}
