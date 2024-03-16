import { createStore } from 'redux';
import rootReducer from './reducers/orderReducer';

const store = createStore(rootReducer);

export default store;
