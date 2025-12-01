const express = require('express');
const telefoneRoutes = express.Router();
const { telefoneController } = require('../controllers/telefoneController');

// Rota para criar um novo telefone
telefoneRoutes.post('/telefones', telefoneController.criarTelefone);
telefoneRoutes.put('/telefones', telefoneController.atualizaTelefone);
telefoneRoutes.get('/telefones', telefoneController.selecionaTodosTelefones);

telefoneRoutes.delete('/telefones/:id', telefoneController.deleteTelefone);
module.exports = { telefoneRoutes };