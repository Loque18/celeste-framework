import { Rpc } from '../../../interfaces';

interface IProviderStrategy {
    getProvider(rpcs: Rpc[]): any;

    requestConnection(provider: any): Promise<void>;
    requestDisconnection(provider: any): Promise<void>;
    requestChangeNetwork(provider: any, chainId: number): Promise<void>;

    getPreviosSession(provider: any): Promise<any>;
}

export default IProviderStrategy;
