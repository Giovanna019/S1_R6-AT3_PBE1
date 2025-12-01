const { query } = require('../config/db');
const {ClienteModel} = require('../models/clienteModel');
// const { telefoneModel } = require('../models/telefoneModel');

const ClienteController = {

    // Criar cliente
    criarCliente: async (req, res) => {
        try {
            const {
                nome_completo,
                cpf,
                email,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                telefones
            } = req.body;

            if (!nome_completo || !cpf || !email || !logradouro || !numero || !bairro || !cidade || !estado || !cep ||! telefones) {
                return res.status(400).json({ erro: "Todos os campos principais devem ser preenchidos." });};
 
            
            const cpfExistente = await ClienteModel.selecionarClientePorCpf(cpf);

            if (cpf == cpfExistente) {
                return res.status(409).json({ erro: "CPF já cadastrado no sistema." });}

            const resultado = await ClienteModel.criarCliente(
                nome_completo,
                cpf,
                email,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                telefones
            );

            return res.status(201).json({
                mensagem: "Cliente cadastrado com sucesso!",
                resultado
            });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    selecionaTodosClientes: async (req, res) => {
        try {
            const clientes = await ClienteModel.selecionaTodosClientes();
            if (clientes.length === 0) {
                return res.status(200).json({ mensagem: "lista de clientes vazia" });
            }
            return res.status(200).json(clientes);

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },
     
    DeleteCliente: async (req,res) => {
        try {
            const id_cliente = req.params.id;
            if (!id_cliente || id_cliente.trim() === '') {
                return res.status(400).json({ erro: "ID do cliente é obrigatório." });
            }
            //envia mensagem de erro.
            const clienteExistente = await ClienteModel.selecionerClientePorId(id_cliente);
            if (!clienteExistente) {
                return res.status(404).json({ erro: "Cliente não encontrado ou já deletado." });
            }
            //se  nao estiver em entregue, nao deixar deletar o cliente
            if (clienteExistente.status_entrega !== 'entregue') {
                return res.status(400).json({ erro: "Não é possível deletar o cliente. Existem entregas pendentes ou em andamento." });
            }
            const resultado = await ClienteModel.deleteCliente(id_cliente);
            return res.status(200).json({
                message: "Cliente deletado com sucesso!",
                data: resultado
            });
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            return res.status(500).json({ erro: error.message });
        }

    }

};

module.exports = ClienteController;