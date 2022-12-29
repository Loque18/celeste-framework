import ProviderContext from '../provider-context';
import InjectedProviderStrategy from '../provider-context/strategies/injected';
import LinkedProviderStrategy from '../provider-context/strategies/linked';

import { providers } from '../constants';
import { Rpc } from '../interfaces';

import { validateProviderType } from '../validators';

const StrategiesMap = {
    [providers.INJECTED]: new InjectedProviderStrategy(),
    [providers.CONNECTED]: new LinkedProviderStrategy(),
};

interface IProviders {
    INJECTED: null;
    CONNECTED: null;
}

class ProviderProxy {
    private currentType: string;
    private context: ProviderContext;
    private providers: IProviders = {
        INJECTED: null,
        CONNECTED: null,
    };

    constructor(rpcs: Rpc[]) {
        this.currentType = providers.INJECTED;

        this.context = new ProviderContext();

        // get all type of providers
        Object.values(providers).forEach(providerType => {
            // instantiate strategies
            // this.context.setStrategy(StrategiesMap[providerType]());

            const provider: any = StrategiesMap[providerType];

            try {
                // instantiate providers
                this.providers[providerType] = provider.getProvider(rpcs);
            } catch (e) {
                // handle error
                // eslint-disable-next-line no-console
                console.warn(`Provider of type ${providerType} not found`);

                this.providers[providerType] = null;
            }
        });

        // set injected provider as default
        this.context.setStrategy(StrategiesMap[providers.INJECTED]);
    }

    getProvider(type: string): any {
        validateProviderType(type);
        return this.providers[type];
    }

    // api
    setType(type: string): void {
        validateProviderType(type);
        this.currentType = type;
        this.context.setStrategy(StrategiesMap[type]);
    }

    // *~~*~~*~~*~~*~~* Wallet methods *~~*~~*~~*~~*~~* //
    async requestConnection(): Promise<void> {
        await this.context.requestConnection(this.providers[this.currentType]);
    }

    async requestDisconnection(): Promise<void> {
        // prettier-ignore
        await this.context.requestDisconnection(this.providers[this.currentType]);
    }

    async requestChangeNetwork(chainId: number): Promise<void> {
        // prettier-ignore
        await this.context.requestChangeNetwork(this.providers[this.currentType], chainId);
    }

    async getPreviousSession(): Promise<any> {
        const connection = await this.context.getPreviosSession(
            this.providers[this.currentType]
        );
        return connection;
    }
}

export default ProviderProxy;
