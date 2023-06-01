<script lang="ts">
	import { onMount } from 'svelte';
	import { encodeBase58, ethers } from 'ethers';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentAccount: string;
	let connectedNetwork: string;
	let signer: ethers.Signer;

	onMount(async () => {
		console.log('onMount');
		if (window && window !== undefined && window.ethereum) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			signer = await provider.getSigner();
			console.log(signer);
		}
	});

	// function handleAccountsChanged(accounts: Array<string>): void {
	// 	if (accounts.length === 0) {
	// 		console.log('Please connect to MetaMask');
	// 		currentAccount = undefined;
	// 	} else if (accounts[0] !== currentAccount) {
	// 		currentAccount = accounts[0];
	// 		connectedNetwork = networks[Number(window.ethereum.chainId)];
	// 	}
	// }

	// function connect(): void {
	// 	window.ethereum
	// 		.request({ method: 'eth_requestAccounts' })
	// 		.then(handleAccountsChanged)
	// 		.catch((err) => {
	// 			if (err.code === 4001) {
	// 				// EIP-1193 userRejectedRequest error
	// 				// If this happens, the user rejected the connection request.
	// 				console.log('Please connect to MetaMask.');
	// 			} else {
	// 				console.error(err);
	// 			}
	// 		});
	// }
</script>

{#if signer}
	<div>signer</div>
{:else}
	<div>Install wallet</div>
{/if}

{#each data.nfts as item}
	<div>{item.tokenId}</div>
	<img src={item?.rawMetadata?.image} alt="NFT" />
{:else}
	<div>no nfts</div>
{/each}
