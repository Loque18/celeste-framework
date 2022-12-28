interface Rpcs {
    chainId: string;
    url: string;
    explorer: string;
}

interface SmartContract {
    key: string;
    abi: string;
    address: string | string[];
}

interface CelesteConfig {
    isMultichain: boolean;
    rpcs: {
        [key: string]: Rpcs;
    };
    smartContracts: SmartContract[];
    addressBook: {
        [key: string]: string;
    };
}

class CelesteJS {
    private config: CelesteConfig;
    private provider: any;
    readonly configRead: Readonly<CelesteConfig>;

    constructor(config: CelesteConfig) {
        console.log(config);
    }
}

export default CelesteJS;
