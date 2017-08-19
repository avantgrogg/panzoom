import test from 'ava';
import * as utils from '../src/js/utils';


test('generateZoomImageRoute: should return an image string with dimensions from the store * 3', t => {
    const state = {
        dimensions: {
            width: 700,
        },       
        images: {
            product: 'http://image.path'
        }
    }
	const actual = utils.generateZoomImageRoute(state);
	const expected = 'http://image.path?w=2100'
	t.is(actual, expected);
});