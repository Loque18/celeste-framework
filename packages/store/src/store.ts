import { legacy_createStore as createStore, combineReducers } from 'redux';

import web3Reducer from './reducers/web3-reducer';
import walletReducer from './reducers/wallet-reducer';

const reducer = combineReducers({
    web3Reducer,
    walletReducer,
});

const store = createStore(reducer);

export default store;
