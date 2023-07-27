import { initializeConnector } from "@web3-react/core";
// import { WalletConnect } from "@web3-react/walletconnect";
// import { URLS } from "./walletChains";

// export const [walletConnect, walletConnecthooks] =
//   initializeConnector<WalletConnect>(
//     (actions) =>
//       new WalletConnect({
//         actions,
//         options: {
//           rpc: { [80001]: "https://rpc-mumbai.maticvigil.com" },
//         },
//       })
//   );

import { WalletConnect } from "@web3-react/walletconnect-v2";
import { MAINNET_CHAINS } from "./walletChains";

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number);

export const [walletConnect, walletConnecthooks] =
  initializeConnector<WalletConnect>(
    (actions) =>
      new WalletConnect({
        actions,
        defaultChainId: 80001,
        options: {
          projectId: "610d37cebcee58b655d731c1c8425709",
          chains: [80001],
          optionalChains,
          optionalMethods: [
            "eth_signTypedData",
            "eth_signTypedData_v4",
            "eth_sign",
          ],
          showQrModal: true,
        },
      })
  );
