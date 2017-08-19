import { initialRender, render } from './components/zoomImage';
import { initialState } from './config';
import { generateStore } from './state';
import { determineViewport } from  './utils';

const store = generateStore(initialState);

store.subscribe(render);

determineViewport(store.updateState);

initialRender(store);

window.__store = store;

