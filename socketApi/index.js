'use strict';

const playerService = require('../services/playerService');

let requests = 0;

const socketApi = (io) => {

	io.on('connection', (socket) => {
		console.log('a user connected');

		socket.playerData = {
			color: playerService.randomColor(),
		};

		socket.join('game');

		socket.on('penMove', (movement) => {
			requests += 1;

			// console.log('MOVE', movement);
			io.in('game').emit('penUpdate', {
				playerColor: socket.playerData.color,
				movement
			});
		});

	});

	setInterval(() => {
		console.log('Requests per second:', requests);
		requests = 0;
	}, 1000);

};

module.exports = socketApi;
