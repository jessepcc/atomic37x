<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	let path: string;

	$: path = $page.url.pathname;

	let signer: ethers.Signer;

	onMount(async () => {
		console.log('onMount');
		if (window && window !== undefined && window.ethereum) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			signer = await provider.getSigner();
		}
	});

	$: path = $page.url.pathname;
</script>

{#if signer}
	<a class={`${path === '/create' ? 'text-red-600' : 'text-gray-600'}`} href="/create">Create</a>
	<a class={`${path === '/mine' ? 'text-red-600' : 'text-gray-600'}`} href="/mine">Mine</a>
{:else}
	<p>
		{' '}
		🦊{' '}
		<a target="_blank" href={`https://metamask.io/download.html`}>
			You must install Metamask, a virtual Ethereum wallet, in your browser.
		</a>
	</p>
{/if}
