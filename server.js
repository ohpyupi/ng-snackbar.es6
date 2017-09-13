'use strict';
const express = require('express');
const logger = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.get('/ui-router*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'templates/ui-router/index.html'));
});

app.get('/react-router*', (req, res, next)=>{
	res.sendFile(path.join(__dirname, 'templates/react-router/index.html'));
});

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(err.status || 500);
	res.json({
		message: `${err.message}`
	});
})

app.listen(PORT);
console.log(`Server running on ${PORT || 8080}`);
