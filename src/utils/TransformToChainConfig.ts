import { NativeTokenCatalog } from "./nativeTokenCatalog";

export type Address = `0x${string}`;

interface ProtocolContracts {
  BandoRouter?: Address;
  BandoFulfillable?: Address;
  BandoRouterProxy?: Address;
  ERC20TokenRegistry?: Address;
  FulfillableRegistry?: Address;
  BandoERC20Fulfillable?: Address;
  BandoFulfillableProxy?: Address;
  BandoFulfillmentManager?: Address;
  ERC20TokenRegistryProxy?: Address;
  FulfillableRegistryProxy?: Address;
  BandoERC20FulfillableProxy?: Address;
  BandoFulfillmentManagerProxy?: Address;
}
export interface SimplifiedChain {
  name: string;
  key: string;
  logoUrl: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl?: string;
  isTestnet: boolean;
  networkType: "EVM" | "SVM" | "UTXO";
  isActive: boolean;
  protocolContracts: ProtocolContracts;
}

export interface Chain {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: string[] };
    public: { http: string[] };
  };
  contracts: {
    multicall3: {
      address: `0x${string}`;
      blockCreated?: number;
    };
  };
  blockExplorers?: {
    default: { name: string; url: string };
  };
  testnet: boolean;
  protocolContracts: ProtocolContracts;
}

export function transformToChainConfig(chain, nativeToken: any): Chain {
  console.log(nativeToken);
  return {
    id: chain.chainId,
    name: chain.name,
    network: chain.key,
    nativeCurrency: {
      name: nativeToken.name,
      symbol: nativeToken.symbol,
      decimals: nativeToken.decimals,
    },
    rpcUrls: {
      default: { http: [chain.rpcUrl] },
      public: { http: [chain.rpcUrl] },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
    testnet: chain.isTestnet,
    protocolContracts: chain.protocolContracts,
  };
}

