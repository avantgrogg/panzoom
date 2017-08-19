import test from 'ava';
import * as zoomComponent from '../../src/js/components/zoomImage';


test('isInsideBox: should return true if new position is still inside bounding box', t => {
    const e = {
        pageX: 0,
        pageY: 0
    }
    const containerPos = {
        top: -10,
        bottom: 10,
        left: -10,
        right: 10
    }
	const actual = zoomComponent.isInsideBox(e, containerPos);
	t.true(actual);
});

test('isInsideBox: should return false if new position is outside bounding box', t => {
    const e = {
        pageX: -20,
        pageY: 0
    }
    const containerPos = {
        top: -10,
        bottom: 10,
        left: -10,
        right: 10
    }
	const actual = zoomComponent.isInsideBox(e, containerPos);
	t.false(actual);
});

test('isEdgeOfImage: should return true if position change isnt at edge of image', t => {
    const state = {
        dimensions: {
            width: 20
        },
        zoomPos: {
            x: 0,
            y: 0
        }
    }
    const xDiff = 1;
    const yDiff = 1;
	const actual = zoomComponent.isEdgeOfImage(xDiff, yDiff, state);
	t.true(actual);
});

test('isEdgeOfImage: should return false if position change is at edge of image', t => {
    const state = {
        dimensions: {
            width: 20
        },
        zoomPos: {
            x: 20,
            y: 20
        }
    }
    const xDiff = 1;
    const yDiff = 1;
	const actual = zoomComponent.isEdgeOfImage(xDiff, yDiff, state);
	t.false(actual);
});