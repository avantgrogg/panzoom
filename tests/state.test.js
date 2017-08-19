import test from 'ava';
import * as state from '../src/js/state';


test('updateDimensions: should return the current state if no matched update found', t => {
	const currentState = {
		width: 700,
	}
	const update = {
		type: 'SOME_OTHER_UPDATE',
		payload: {
			width: 500
		}
	}
	const actual = state.updateDimensions(currentState, update);
	const expected = currentState;
	t.deepEqual(actual, expected);
});

test('updateDimensions: should return the updated width value if SAVE_VIEWPORT_DIMENSIONS update', t => {
	const currentState = {
		width: 700,
	}
	const update = {
		type: 'SAVE_VIEWPORT_DIMENSIONS',
		payload: {
			width: 500
		}
	}
	const actual = state.updateDimensions(currentState, update);
	const expected = update.payload;
	t.deepEqual(actual, expected);
});

test('updateZoomed: should toggle zoom value if ZOOM_IMAGE update', t => {
	const zoomed = false;
	const update = {
		type: 'ZOOM_IMAGE'
	}
	const actual = state.updateZoomed(zoomed, update);
	t.true(actual);
});

test('updateZoomposition: should reset zoom position values if update is ZOOM_IMAGE', t => {
	const zoomPos = {
		x: 340,
		y: 560
	}
	const update = {
		type: 'ZOOM_IMAGE'
	}
	const actual = state.updateZoomPosition(zoomPos, update);
	const expected = {
		x: 0,
		y: 0
	}
	t.deepEqual(actual, expected);
});

test('updateZoomposition: should update zoom pos values if update is UPDATE_ZOOM_POSITION', t => {
	const zoomPos = {
		x: 1,
		y: 1
	}
	const update = {
		type: 'UPDATE_ZOOM_POSITION',
		payload: {
			x: 1,
			y: 1
		}
	}
	const actual = state.updateZoomPosition(zoomPos, update);
	const expected = {
		x: 2,
		y: 2
	}
	t.deepEqual(actual, expected);
});








