import Web3 from 'web3';
import { store as celesteStore, actions } from '@celestejs/store';

import { CelesteConfig, SmartContract } from '../interfaces';

const { add_contract, remove_contract } = actions;

function removeWriteSmartContracts() {
    const { contracts } = celesteStore.getState().web3Reducer;

    Object.keys(contracts).forEach((key: string) => {
        if (key.includes('_READ')) return;
        celesteStore.dispatch(remove_contract(key, null));
    });
}

// prettier-ignore
function initSC (address: string, smartContract: SmartContract, web3: Web3, key: string): void {

    const {abi, key: scKey} = smartContract;

    const contract = new web3.eth.Contract(abi, address);
    celesteStore.dispatch(add_contract(`${scKey}${key}`, contract));
}

// prettier-ignore
async function initSmartContracts (config: CelesteConfig, web3: Web3, chainId: number): Promise<void> {
    const { smartContracts, isMultichain } = config;

    smartContracts.forEach(async sc => {
        const address = (isMultichain ? sc.address[chainId] : sc.address) as string;

        if (!address) return;

        initSC(address, sc, web3, '');
    });
}

export { removeWriteSmartContracts, initSC, initSmartContracts };
