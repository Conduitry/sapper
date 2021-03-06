const path = require('path');
const assert = require('assert');

const create_matchers = require('./create_matchers.js');

describe('create_matchers', () => {
	it('sorts routes correctly', () => {
		const matchers = create_matchers(['index.html', 'about.html', '%wildcard%.html', 'post/%id%.html']);

		assert.deepEqual(
			matchers.map(m => m.file),
			[
				'about.html',
				'index.html',
				'post/%id%.html',
				'%wildcard%.html'
			]
		);
	});

	it('generates params', () => {
		const matchers = create_matchers(['index.html', 'about.html', '%wildcard%.html', 'post/%id%.html']);

		let file;
		let params;
		for (let i = 0; i < matchers.length; i += 1) {
			const matcher = matchers[i];
			if (params = matcher.exec('/post/123')) {
				file = matcher.file;
				break;
			}
		}

		assert.equal(file, 'post/%id%.html');
		assert.deepEqual(params, {
			id: '123'
		});
	});
});