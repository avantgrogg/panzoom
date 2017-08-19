export const SAVE_VIEWPORT_DIMENSIONS = 'SAVE_VIEWPORT_DIMENSIONS';
export const ZOOM_IMAGE = 'ZOOM_IMAGE';
export const UPDATE_ZOOM_POSITION = 'UPDATE_ZOOM_POSITION';

/**
 * An object containing viewport dimensions for store mutation.
 * @param {number} width - The viewport width
 * @param {number} height - The viewport height 
 */
export function saveViewportDimensions({width, height}) {
    return {
        type: SAVE_VIEWPORT_DIMENSIONS,
        payload: {
            height,
            width
        }
    }
}

/**
 * An object describing a change to the store for zooming.
 */
export function zoomImage() {
    return {
        type: ZOOM_IMAGE
    }
}

/**
 * An object describing a change to zoomed image position data
 * @param {number} x - The change in x position
 * @param {number} y - The change in y position
 */
export function updateZoomPosition(x, y) {
    return {
        type: UPDATE_ZOOM_POSITION,
        payload: {
            x,
            y
        }
    }
}
