export interface SmartContract {
    key: string;
    abi: any;
    address: string[] | string;
}

export interface Rpc {
    chainId: string;
    url: string;
    explorer: string;
}

export interface CelesteConfig {
    isMultichain: boolean;
    rpcs: {
        [key: string]: Rpc;
    };
    smartContracts: SmartContract[];
    addressBook: {
        [key: string]: string;
    };
}
