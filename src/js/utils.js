import { saveViewportDimensions } from './actions';

export function determineViewport(updateState) {
    updateState(saveViewportDimensions(window.innerWidth, window.innerHeight));
}

export function generateImageRoute({dimensions, routes}) {
    return `${routes.images}?w=${dimensions.width}`;
}

export function generateZoomImageRoute({dimensions, routes}) {
    return `${routes.images}?w=${dimensions.width*3}`;
}

export function getImageCenter({dimensions}) {
    const containerSize = dimensions.width;
    const imageSize = containerSize*3;
    return (imageSize-containerSize)/2;
}