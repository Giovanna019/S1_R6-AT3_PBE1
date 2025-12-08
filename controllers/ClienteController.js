const { ClienteModel } = require('./models/clienteModel');
const { telefoneModel } = require('./models/telefoneModel');

const ClienteController = {

    // Criar cliente
    criarCliente: async (req, res) => {
        try {
            const { nome_cliente, cpf_cliente, email_cliente, endereco_cliente, telefones } = req.body;

            if (!nome_cliente || !cpf_cliente || !email_cliente || !endereco_cliente) {
                return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
            }

            // Verifica CPF existente
            const cpfExiste = await ClienteModel.selecionarClientePorCpf(cpf_cliente);

            if (cpfExiste) {
                return res.status(409).json({ erro: "CPF já cadastrado no sistema." });
            }

            const resultado = await ClienteModel.criarCliente(
                nome_cliente,
                cpf_cliente,
                email_cliente,
                endereco_cliente,
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

    // Selecionar todos os clientes
    selecionaTodosClientes: async (req, res) => {
        try {
            const clientes = await ClienteModel.selecionaTodosClientes();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    // Atualizar cliente
    atualizaCliente: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome_cliente, cpf_cliente, email_cliente, endereco_cliente } = req.body;

            if (!id) {
                return res.status(400).json({ erro: "O ID do cliente é obrigatório." });
            }

            const resultado = await ClienteModel.atualizaCliente(
                id,
                nome_cliente,
                cpf_cliente,
                email_cliente,
                endereco_cliente
            );

            return res.status(200).json({
                mensagem: "Cliente atualizado com sucesso!",
                resultado
            });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    // Atualizar telefone
    atualizaTelefone: async (req, res) => {
        try {
            const id_telefone = req.params.id;
            const { novo_numero } = req.body;

            if (!id_telefone || !novo_numero) {
                return res.status(400).json({ erro: "ID do telefone e novo número são obrigatórios." });
            }

            const resultado = await telefoneModel.atualizaTelefone(id_telefone, novo_numero);

            return res.status(200).json({
                mensagem: "Telefone atualizado com sucesso!",
                resultado
            });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    },

    // Deletar cliente
    deleteCliente: async (req, res) => {
        try {
            const id_cliente = req.params.id;

            if (!id_cliente) {
                return res.status(400).json({ erro: "ID do cliente é obrigatório." });
            }

            const resultado = await ClienteModel.deleteCliente(id_cliente);

            return res.status(200).json({
                mensagem: "Cliente deletado com sucesso!",
                resultado
            });

        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

};

module.exports = ClienteController;
