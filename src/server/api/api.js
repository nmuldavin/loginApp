/* eslint global-require: 0 */
const express = require('express');
const getCalendar = require('./routes/getCalendar');

const api = express.Router();

api.get('/api/getCalendar', (req, res) => getCalendar(req.query).pipe(res));

module.exports = api;
