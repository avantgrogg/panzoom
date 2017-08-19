import { initialRender, render } from './components/zoomImage';
import { initialState } from './config';
import { generateStore } from './state';
import { determineViewport } from  './utils';
import { saveViewportDimensions } from './actions';

//Create a new store to hold all application state
const store = generateStore(initialState);
//Allow the zoomImage render method to be notified of state changes
store.subscribe(render);
//Get the current viewport dimensions and update the state with values
store.updateState(saveViewportDimensions(determineViewport()));
//Call zoomImage's initialRender fn which in addition to rendering also binds the components events
initialRender(store);
//Attach the store to window for debugging purposes
window.__store = store;

