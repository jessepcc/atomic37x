// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { BrowserProvider, Eip1193Provider } from 'ethers';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		ethereum: Eip1193Provider & BrowserProvider;
	}
}

export {};
``;
