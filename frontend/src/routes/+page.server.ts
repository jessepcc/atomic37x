import type { PageServerLoad } from './$types';
import { Alchemy, Network } from 'alchemy-sdk';
import { env } from '$env/dynamic/private';

export const load = (async ({ params }) => {
	const alchemy_config = {
		apiKey: env.ALCHEMY_API_KEY,
		network: Network.ETH_GOERLI
	};

	const alchemy = new Alchemy(alchemy_config);

	const getNFTList = async () => {
		// Contract address
		const address = '0x591A13B11B16889c346F3310e9fd1D22Ab47eCd9';

		// Flag to omit metadata
		const omitMetadata = false;

		// Get all NFTs
		const { nfts } = await alchemy.nft.getNftsForContract(address, {
			omitMetadata: omitMetadata
		});

		return nfts;
	};

	return {
		nfts: await getNFTList()
	};
}) satisfies PageServerLoad;
