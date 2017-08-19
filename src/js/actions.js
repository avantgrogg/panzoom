export const SAVE_VIEWPORT_DIMENSIONS = 'SAVE_VIEWPORT_DIMENSIONS';
export const ZOOM_IMAGE = 'ZOOM_IMAGE';
export const UPDATE_ZOOM_POSITION = 'UPDATE_ZOOM_POSITION';

export function saveViewportDimensions(width, height) {
    return {
        type: SAVE_VIEWPORT_DIMENSIONS,
        payload: {
            height,
            width
        }
    }
}

export function zoomImage() {
    return {
        type: ZOOM_IMAGE
    }
}

export function updateZoomPosition(x, y, offsetX, offsetY) {
    return {
        type: UPDATE_ZOOM_POSITION,
        payload: {
            x,
            y,
            offsetX,
            offsetY
        }
    }
}
