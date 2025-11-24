const { clienteModel } = require("../models/clienteModel")
const clienteController = {

    // cadastra um cliente novo
    criarCliente: async (req, res) => {
        try {
            const dados = req.body

            // só conferindo se veio tudo certinho do front
            if(!dados.nome || !dados.cpf || !dados.telefone || !dados.email){
                return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." })
            }

            const resultado = await clienteModel.criarCliente(dados)

            res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!", id: resultado.insertId })
        } catch (erro) {
            console.log("Erro ao cadastrar cliente:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    },

    // pega todos os clientes cadastrados
    listarClientes: async (req, res) => {
        try {
            const [lista] = await clienteModel.listarClientes()
            res.json(lista)
        } catch (erro) {
            console.log("Erro para listar clientes:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    },

    // pega apenas um cliente pelo ID
    buscarPorId: async (req, res) => {
        try {
            const id = req.params.id

            const [cliente] = await clienteModel.buscarPorId(id)

            if(cliente.length === 0){
                return res.status(404).json({ mensagem: "Cliente não encontrado." })
            }

            res.json(cliente[0])
        } catch (erro) {
            console.log("Erro ao buscar cliente:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    }
}

module.exports = { clienteController }
