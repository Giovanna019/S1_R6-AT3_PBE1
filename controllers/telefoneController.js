const { query } = require('../config/db');
const { telefoneModel } = require('../models/telefoneModel');
const telefoneController = {
   
    //criação do telefoone
    criarTelefone: async (req, res) => {
        try {
            const { id_cliente_fk, numero_telefone,} = req.body;

            if (!id_cliente_fk || !numero_telefone ) {
                return res.status(400).json({ erro: "Todos os campos devem ser preenchidos." });
            }

            const resultado = await telefoneModel.adicionarTelefone(
                id_cliente_fk,
                numero_telefone,
    
            );

            return res.status(201).json({
                mensagem: "Telefone cadastrado com sucesso!",
                resultado
            });
        } catch (error) {
            return res.status(500).json({
                erro: "Erro ao cadastrar telefone.",
                detalhes: error.message
            });
        }
    },

  
     //atualização do telefone
    atualizaTelefone: async (req, res) => {
        try {
            const { id } = req.query;
            const { numero_telefone } = req.body;
            if (!id || !numero_telefone) {
                return res.status(400).json({ erro: "ID do telefone e número  devem ser fornecidos." });
            }
            const resultado = await telefoneModel.atualizaTelefone(id, numero_telefone);
            return res.status(200).json({
                mensagem: "Número de telefone atualizado com sucesso!",
                resultado
            });



        } catch (error) {
            return res.status(500).json({
                erro: "Erro ao cadastrar telefone.",
                detalhes: error.message
            });
        }
    },
   
    //selecionamento
    selecionaTodosTelefones: async (req, res) => {
        try {
            const telefones = await telefoneModel.selecionaTodosTelefones();
            if (telefones.length === 0) {
                return res.status(200).json({ mensagem: "Nenhum telefone listado." });
            }
            return res.status(200).json(telefones);
        } catch (error) {
            return res.status(500).json({
                erro: "Erro ao buscar telefones.",
                detalhes: error.message
            });
        }
    },

    //delete
    deleteTelefone: async (req, res) => {
        try {
            const id_telefone = req.params.id;
            if (!id_telefone) {
                return res.status(400).json({ erro: "ID do telefone é obrigatório." });
            }
            //verificar se o telefone existe antes de deletar
            const telefoneExistente = await telefoneModel.selecionaTelefonePorId(id_telefone);
            const telefoneEncontrado = telefoneExistente[0];
            if (!telefoneEncontrado) {
                return res.status(404).json({ erro: "Telefone não encontrado." });
            }
            const resultado = await telefoneModel.deleteTelefone(id_telefone);
            return res.status(200).json({
                mensagem: "Telefone deletado com sucesso!",
                resultado
            });
        } catch (error) {
            return res.status(500).json({
                erro: "Erro ao deletar telefone.",
                detalhes: error.message
            }); 
            
        }
    }
}
module.exports = { telefoneController };