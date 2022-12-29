import IProviderStrategy from './strategies/IProviderStrategy';
import { Rpc } from '../interfaces';

class ProviderContext {
    private _strategy: IProviderStrategy;

    setStrategy(strategy: IProviderStrategy): void {
        this._strategy = strategy;
    }

    getProvider(rpcs: Rpc[]): any {
        return this._strategy.getProvider(rpcs);
    }

    /* *~~*~~*~~*~~*~~* Wallet methods *~~*~~*~~*~~*~~* */
    async requestConnection(provider: any): Promise<void> {
        return this._strategy.requestConnection(provider);
    }

    async requestDisconnection(provider: any): Promise<void> {
        return this._strategy.requestDisconnection(provider);
    }

    async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
        return this._strategy.requestChangeNetwork(provider, chainId);
    }

    async getPreviosSession(provider: any): Promise<any> {
        return this._strategy.getPreviosSession(provider);
    }
}

export default ProviderContext;
