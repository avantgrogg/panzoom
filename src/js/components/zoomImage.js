import { images } from '../config';
import { zoomImage, updateZoomPosition } from '../actions';
import morphdom from 'morphdom';
import { generateImageRoute, generateZoomImageRoute, getImageCenter } from '../utils';

const domLocation = '#zoom-component';

export const template = (state) => {
    if(!state.zoomed) {
        return `<div id="zoom-component">
                    <div class="icons">
                        <img class="icon zoom-in" src="https://bnbs-gramercy-public.s3.amazonaws.com/homework/zoom-in.svg"/>
                        <img class="icon zoom-out disabled" src="https://bnbs-gramercy-public.s3.amazonaws.com/homework/zoom-out.svg"/>
                    </div>
                    <div class="images-container" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px">
                        <img class="zoom-image" src="${generateZoomImageRoute(state)}" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px; transform: matrix(1, 0, 0, 1, ${state.zoomPos.x}, ${state.zoomPos.y});"/>
                    </div>
                </div>`
    } else {
        return `<div id="zoom-component">
                    <div class="icons">
                        <img class="icon zoom-in disabled" src="https://bnbs-gramercy-public.s3.amazonaws.com/homework/zoom-in.svg"/>
                        <img class="icon zoom-out" src="https://bnbs-gramercy-public.s3.amazonaws.com/homework/zoom-out.svg"/>
                    </div>
                    <div class="images-container zoomed" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px">
                        <img class="zoom-image zoomed" src="${generateZoomImageRoute(state)}" style="width:${state.dimensions.width}px; height:${state.dimensions.width}px; transform: matrix(3, 0, 0, 3, ${state.zoomPos.x}, ${state.zoomPos.y});"/>
                    </div>
                </div>`
    }
}

export function bindEvents(store) {
    const containerPos = document.querySelector('.images-container').getBoundingClientRect();
    document.querySelector('.zoom-image').addEventListener('touchstart', (e) => {
        e.preventDefault();
        const {pageX, pageY} = e;
        let currentPageX = pageX;
        let currentPageY = pageY;

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

        function zoomOrDrag(e) {
            if(e.changedTouches[0].pageX=== pageX && e.changedTouches[0].pageY === pageY) {
                store.updateState(zoomImage());
            }
            document.querySelector('.zoom-image').removeEventListener('touchend', zoomOrDrag);
            document.querySelector('body').removeEventListener('touchmove', touchMovement);
        }

        document.querySelector('.zoom-image').addEventListener('touchend', zoomOrDrag);
        document.querySelector('body').addEventListener('touchmove', touchMovement);
    })

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

export function isInsideBox(e, containerPos) {
    return e.pageX > containerPos.left && e.pageX < containerPos.right && e.pageY > containerPos.top && e.pageY < containerPos.bottom;
}

export function isEdgeOfImage(xDiff, yDiff, state) {
    return  state.zoomPos.x + xDiff <= state.dimensions.width && state.zoomPos.x + xDiff >= -state.dimensions.width && state.zoomPos.y + yDiff <= state.dimensions.width && state.zoomPos.y + yDiff >= -state.dimensions.width;
}

export function render(state) {
    morphdom(document.querySelector(domLocation), template(state).trim());
}

export function initialRender(store) {
    render(store.getState());
    bindEvents(store);
}