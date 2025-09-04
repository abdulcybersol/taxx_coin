// import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
// import * as Web3Modal from "https://cdn.jsdelivr.net/npm/web3modal@1.9.12/dist/index.js";

// const connectButton = document.getElementById("connectButton");
// const accountDiv = document.getElementById("account");

// const web3Modal = new Web3Modal.Web3Modal({
//   cacheProvider: false,
// });

// connectButton.onclick = async () => {
//   try {
//     const instance = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(instance);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     accountDiv.innerText = `Connected address: ${address}`;
//   } catch (e) {
//     console.error(e);
//     accountDiv.innerText = "Connection failed";
//   }
// };

// import { Web3Modal } from 'https://unpkg.com/@web3modal/html@2.6.3?module';
// import { EthereumClient, w3mConnectors, w3mProvider } from 'https://unpkg.com/@web3modal/ethereum@2.6.3?module';
// import { configureChains, createConfig, WagmiConfig } from 'https://unpkg.com/wagmi@1.3.0?module';
// import { mainnet } from 'https://unpkg.com/wagmi@1.3.0/chains/mainnet?module';

// const projectId = 'ea80cdf5d329fb23022a5d4705e8d04c';

// const chains = [mainnet];
// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, version: '1', chains }),
//   publicClient
// });

// const ethereumClient = new EthereumClient(wagmiConfig, chains);

// const modal = new Web3Modal({
//   projectId,
//   themeMode: 'light',
//   themeColor: 'blue',
//   walletImages: {
//     coinbase: 'https://wallet.coinbase.com/assets/favicon.ico',
//     trust: 'https://trustwallet.com/assets/images/media-kit/icon-download-blue.png'
//   },
//   enableWalletFeatures: true
// }, ethereumClient);

// document.getElementById("connectButton").addEventListener("click", async () => {
//   modal.openModal();
// });


import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "YOUR_INFURA_ID"
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions
});

const connectBtn = document.createElement("button");
connectBtn.textContent = "Connect Wallet";
document.body.appendChild(connectBtn);

connectBtn.onclick = async () => {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  alert("Connected: " + address);
};

