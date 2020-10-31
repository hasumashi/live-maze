'use strict';

// Require modules always relative to project root
require('app-module-path').addPath(__dirname);

// Initialize express
const express = require('express');
const app = express();
const port = 3000;

// Initialize socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketApi = require('socketApi')(io);

// Static files
app.use(express.static('public'))
app.use('/assets', express.static('assets'))

// Routes
app.use(
	require('routes')
);

http.listen(port, () => {
  console.log(`Live Maze server is listening at http://localhost:${port}`);
});
