/**
 * Calculage the current viewport dimensions
 */
export function determineViewport() {
    return {width: window.innerWidth, height: window.innerHeight };
}

/**
 * Create a string with the product image route and dimensions*3 for current viewport
 * @param {object} dimensions - The current width/height values used for the product image
 * @param {object} images - The image routes  
 */
export function generateZoomImageRoute({dimensions, images}) {
    return `${images.product}?w=${dimensions.width*3}`;
}