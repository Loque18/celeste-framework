import WalletConnectProvider from '@walletconnect/web3-provider';

import IProviderStrategy from '../IProviderStrategy';

import { Rpc } from '../../../interfaces';

class LinkedProviderStrategy implements IProviderStrategy {
    getProvider(rpcs: Rpc[]): any {
        const rpcObject = {};

        rpcs.forEach(rpc => {
            const { chainId, url } = rpc;
            rpcObject[+chainId] = url;
        });

        const provider = new WalletConnectProvider({
            rpc: rpcObject,
        });

        return provider;
    }

    async requestConnection(provider: any): Promise<void> {
        await provider.enable();
    }

    async requestDisconnection(provider: any): Promise<void> {
        await provider.disconnect();
    }

    async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
        console.warn(`Please change to network ${chainId}`);
    }

    async getPreviosSession(provider: any): Promise<any> {
        if (!provider.connector.connected) return null;
        await provider.enable();

        return provider;
    }
}

export default LinkedProviderStrategy;
