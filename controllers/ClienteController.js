const { clienteModel } = require("../models/clienteModel")

const clienteController = {

    // lista todos
    listarClientes: async (req, res) => {
        try {
            const lista = await clienteModel.selecionarTodos()
            res.json(lista)
        } catch (erro) {
            console.log("deu ruim na listagem:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    },

    // puxa por id
    buscarClientePorId: async (req, res) => {
        try {
            const id = req.params.id
            const cliente = await clienteModel.selecionarPorId(id)

            if (!cliente) {
                return res.status(404).json({ mensagem: "Cliente não encontrado." })
            }
            res.json(cliente)

        } catch (erro) {
            console.log("erro ao buscar por id:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    },

    // cria novo cliente
    inserirCliente: async (req, res) => {
        try {
            const { nome, cpf, telefone, email, endereco } = req.body

            if (!nome || !cpf || !telefone || !email) {
                return res.status(400).json({ mensagem: "manda os 4 campos ai pfv" })
            }

            const resultado = await clienteModel.inserirCliente({
                nome, cpf, telefone, email, endereco
            })

            res.status(201).json({ mensagem: "cliente criado meu patrão", id: resultado })

        } catch (erro) {
            console.log("erro ao inserir:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    }
}

module.exports = { clienteController }
