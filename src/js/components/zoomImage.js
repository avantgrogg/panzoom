import { images } from '../config';
import { zoomImage, updateZoomPosition } from '../actions';
import morphdom from 'morphdom';
import { generateImageRoute, generateZoomImageRoute, getImageCenter } from '../utils';
//The location to bind the component
const domLocation = '#zoom-component';

/**
 * Generates a template string representing the zoom component with the current states data
 * @param {object} state - The current state of the store 
 */
export const template = (state) => {
    if(!state.zoomed) {
        return `<div id="zoom-component">
                    <div class="icons">
                        <img class="icon zoom-in" src="${state.images.zoomIn}"/>
                        <img class="icon zoom-out disabled" src="${state.images.zoomOut}"/>
                    </div>
                    <div class="images-container" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px">
                        <img class="zoom-image" src="${generateZoomImageRoute(state)}" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px; transform: matrix(1, 0, 0, 1, ${state.zoomPos.x}, ${state.zoomPos.y});"/>
                    </div>
                </div>`
    } else {
        return `<div id="zoom-component">
                    <div class="icons">
                        <img class="icon zoom-in disabled" src="${state.images.zoomIn}"/>
                        <img class="icon zoom-out" src="${state.images.zoomOut}"/>
                    </div>
                    <div class="images-container zoomed" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px">
                        <img class="zoom-image zoomed" src="${generateZoomImageRoute(state)}" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px; transform: matrix(3, 0, 0, 3, ${state.zoomPos.x}, ${state.zoomPos.y});"/>
                    </div>
                </div>`
    }
}

/**
 * Attach all events related to the zoom component
 * @param {object} store - The application store 
 */
export function bindEvents(store) {
    //maintain the coords of the image container to check for out of bounds movement
    const containerPos = document.querySelector('.images-container').getBoundingClientRect();
    //Bind touch events first. Listen for a touchstart on the zoom image
    document.querySelector('.zoom-image').addEventListener('touchstart', (e) => {
        //prevents mouse events from also triggering
        e.preventDefault();
        //get the initial touch coords
        const {pageX, pageY} = e;
        //create a variable to hold updated touch coords
        let currentPageX = pageX;
        let currentPageY = pageY;
        //Handle a touchmove event by determing what the x,y diff was, and then checking if the movement was in bounds
        //is not at the edge of the image and that the image is zoomed. If all are true then send update to store
        function touchMovement(e) {
            e.preventDefault();
            const xDiff = e.changedTouches[0].pageX - currentPageX;
            const yDiff = e.changedTouches[0].pageY - currentPageY;

            if( store.getState().zoomed && isInsideBox(e, containerPos) && isEdgeOfImage(xDiff, yDiff, store.getState())) {
                currentPageX = e.changedTouches[0].pageX;
                currentPageY = e.changedTouches[0].pageY;
                store.updateState(updateZoomPosition(xDiff, yDiff));
            }
        }
        //Handle a touchend event. Determine if a move did not occur. If true, update the store. Remove bindings for
        //touchmove and touchend
        function zoomOrDrag(e) {
            if(e.changedTouches[0].pageX === pageX && e.changedTouches[0].pageY === pageY) {
                store.updateState(zoomImage());
            }
            document.querySelector('.zoom-image').removeEventListener('touchend', zoomOrDrag);
            document.querySelector('body').removeEventListener('touchmove', touchMovement);
        }
        //Add bindings for touchmove and touchend
        document.querySelector('.zoom-image').addEventListener('touchend', zoomOrDrag);
        document.querySelector('body').addEventListener('touchmove', touchMovement);
    })
    //Bind touch events for mouse. Nearly identical to touch events but using mouse events. And also using 
    //pageX instead of changedTouches to get position changes
    document.querySelector('.zoom-image').addEventListener('mousedown', (e) => {
        e.preventDefault();
        const boundMouseMovement = mouseMovement.bind(store, containerPos);
        const {pageX, pageY} = e;
        let currentPageX = pageX;
        let currentPageY = pageY;

        function mouseMovement(e) {
            e.preventDefault();
            const xDiff = e.pageX - currentPageX;
            const yDiff = e.pageY - currentPageY;

            if( store.getState().zoomed && isInsideBox(e, containerPos) && isEdgeOfImage(xDiff, yDiff, store.getState())) {
                currentPageX = e.pageX;
                currentPageY = e.pageY;
                store.updateState(updateZoomPosition(xDiff, yDiff));
            }
        }

        function zoomOrDrag(e) {
            if(e.pageX === pageX && e.pageY === pageY) {
                store.updateState(zoomImage());
            }
            document.querySelector('.zoom-image').removeEventListener('mouseup', zoomOrDrag);
            document.removeEventListener('mousemove', mouseMovement);
        }

        document.querySelector('.zoom-image').addEventListener('mouseup', zoomOrDrag);
        document.addEventListener('mousemove', mouseMovement);
    })

    Array.from(document.querySelectorAll('.icon')).map((el) => el.addEventListener('click', (e) => {
        if(!e.currentTarget.classList.contains('disabled')) {
            store.updateState(zoomImage());
        }
    }))
}

/**
 * Determines if the current movement is outside of the bounding box around the image.
 * @param {object} e - The current event
 * @param {object} containerPos - The bounding box around the product image
 */
export function isInsideBox(e, containerPos) {
    return e.pageX > containerPos.left && e.pageX < containerPos.right && e.pageY > containerPos.top && e.pageY < containerPos.bottom;
}

/**
 * Determines if the current movement is at one of the edges of the image.
 * @param {number} xDiff - The change in x position
 * @param {number} yDiff - The change in y position
 * @param {object} state - The current state
 */
export function isEdgeOfImage(xDiff, yDiff, state) {
    return  state.zoomPos.x + xDiff <= state.dimensions.width && state.zoomPos.x + xDiff >= -state.dimensions.width && state.zoomPos.y + yDiff <= state.dimensions.width && state.zoomPos.y + yDiff >= -state.dimensions.width;
}

/**
 * Updates the dom with the components current template string using morphdom.
 * @param {object} state - The current state of the store
 */
export function render(state) {
    morphdom(document.querySelector(domLocation), template(state).trim());
}

/**
 * Updates the dom and binds the components events.
 * @param {object} store - The application store
 */
export function initialRender(store) {
    render(store.getState());
    bindEvents(store);
}