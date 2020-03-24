const express = require('express');

const ongController = require('./controllers/ongController');
const caseController = require('./controllers/caseController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');


const routes = express.Router();

routes.post('/session', sessionController.login);

routes.get('/profile', profileController.listCases);

routes.get('/ongs', ongController.listOngs);
routes.post('/ongs', ongController.createOng);

routes.get('/cases', caseController.listCases);
routes.post('/cases', caseController.createCase);
routes.delete('/cases/:id', caseController.deleteCase);


module.exports = routes;