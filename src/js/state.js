import { SAVE_VIEWPORT_DIMENSIONS, ZOOM_IMAGE, UPDATE_ZOOM_POSITION } from './actions';
import { defaults } from './config';

/**
 * Updates the dimensions part of the store with a new dimensions
 * @param {object} state - The current dimensions state 
 * @param {object} update - The update flowing through the store
 */
export function updateDimensions(state, update) {
    if(update.type === SAVE_VIEWPORT_DIMENSIONS) {
        return Object.assign({}, state, {
            width: Math.min(update.payload.width, defaults.maxImageWidth)
        });
    }

    return state;
}

/**
 * Toggles the value of zoomed in the store
 * @param {*} state - The current zoomed state
 * @param {object} update - The update flowing through the store
 */
export function updateZoomed(state, update) {
    if(update.type === ZOOM_IMAGE) {
        return !state;
    }

    return state;
}

/**
 * Updates the zoomPosition part of the store with new position data
 * @param {*} state - The current zoomPosition state
 * @param {object} update - The update flowing through the store
 */
export function updateZoomPosition(state, update) {
    if(update.type === ZOOM_IMAGE) {
        return Object.assign({}, {
            x: 0,
            y:0
        })
    }

    if(update.type === UPDATE_ZOOM_POSITION) {
        return Object.assign({}, {
            x: Number(state.x + update.payload.x),
            y: Number(state.y + update.payload.y)
        })
    }

    return state;
}

/**
 * Update all of the state
 * @param {Object} state - The current state of the app
 * @param {Object} update - The description of the state change
 */
export function determineStateChange(state, update) {
    return Object.assign({}, state, {
        dimensions: updateDimensions(state.dimensions, update),
        zoomed: updateZoomed(state.zoomed, update),
        zoomPos: updateZoomPosition(state.zoomPos, update)
    });
}

/**
 * Maps over all subscribed callbacks and executes them
 * @param {Array} subscribers - A list of callback fns
 */
export function notifySubscribers(subscribers, state) {
    subscribers.map((subscriber) => subscriber(state));
}

/**
 * Creates a new store object
 * @param {Object} initialState - State used to hydrate the store
 * @param {Object} options - Addional data to be attached to the store
 */
export function generateStore(initialState = {}, options = {}) {
    let state = initialState;
    let subscribers = [];
    return Object.assign({}, options, {
        getState: () => Object.assign({}, state),
        updateState: (update) => {
            state = determineStateChange(state, update);
            notifySubscribers(subscribers, state);
        },
        subscribe: (subscriber) => subscribers.push(subscriber),
    });
}
