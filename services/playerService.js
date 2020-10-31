'use strict';

module.exports = {

	randomColor() {
		const colorHex = Math.floor(Math.random()*16777215).toString(16);
		return `#${colorHex}`;
	}

};
