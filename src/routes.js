const express = require('express');

const SessionControllers = require('./controllers/SessionControllers');
const UserControllers = require('./controllers/UserControllers');
const ClienteControllers = require('./controllers/ClienteControllers');
const ServicoControllers = require('./controllers/ServicoControllers');

const routes = express.Router();

routes.post('/sessions', SessionControllers.create);

routes.get('/users', UserControllers.index);
routes.post('/users', UserControllers.create);
routes.delete('/users/:id', UserControllers.delete);

routes.get('/clientes', ClienteControllers.index);
routes.get('/clientes/:id', ClienteControllers.show);
routes.post('/clientes', ClienteControllers.create);
routes.delete('/clientes/:id', ClienteControllers.delete);

routes.get('/servicos', ServicoControllers.index);
routes.get('/servicos/:id', ServicoControllers.show);
routes.post('/servicos', ServicoControllers.create);
routes.delete('/servicos/:id', ServicoControllers.delete);

module.exports = routes;