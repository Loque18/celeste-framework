import Web3 from 'web3';

/* eslint-disable func-names */
function SmartContractFactory(web3: Web3) {
    return {
        create: function (abi, address): any {
            return new web3.eth.Contract(abi, address);
        },
    };
}

export default SmartContractFactory;
