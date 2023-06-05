# Atomic38x

This project demonstrates a basic NFT project with hardhat. It comes with a ERC721 contract, a test for that contract, a script that deploys that contract and a basic front end with SvelteKit

The idea is inspired by the bestseller [Atomic Habit](https://jamesclear.com/atomic-habits) by James Clear. Getting 1% better every day will make you 38x better after a year. Using fully on chain NFT to record and share your progress.

1. Create your habit
2. Check in every day to record the progress

![Atomic 38x](https://jamesclear.com/wp-content/uploads/2014/07/tiny-gains.jpg)


### Smart Contract
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts --network <network-name>
```

### Frontend
```shell
cd frontend
npm run dev
```
