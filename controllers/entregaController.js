const { query } = require('./config/db');
const { entregaModel } = require('./models/entregaModel');
const entregaController = {

    mostraTodasEntregas: async (req, res) => {
        try {
            const entregas = await entregaModel.TodasEntregas();

            if (entregas.length === 0) {
                return res.status(200).json({ mensagem: "Nenhuma entrega encontrada." });
            }

            return res.status(200).json(entregas);

        } catch (error) {
            return res.status(500).json({
                erro: "Erro ao listar entregas.",
                detalhes: error.message
            });
        }
    },

//cria da nova entrega
    criaNovaEntrega: async (req, res) => {
        try {
            const { id_pedido_fk, status_entrega } = req.body;

            if (!id_pedido_fk) {
                return res.status(400).json({
                    erro: "O campo id_pedido_fk é obrigatório."
                });
            }
            if (status_entrega && typeof status_entrega !== 'string') {
                return res.status(400).json({
                    erro: "O campo status_entrega deve ser uma string."
                });
            }
            if (status_entrega && !['pendente', 'em andamento', 'entregue',].includes(status_entrega)) {
                return res.status(400).json({
                    erro: "O campo status_entrega deve ser 'pendente', 'em andamento' ou 'entregue'."
                });
            }

            const resultado = await entregaModel.criarNovaEntrega(
                id_pedido_fk,
                status_entrega || 'pendente'
            );

            return res.status(201).json({
                mensagem: "Entrega criada com sucesso!",
                entrega: resultado
            });

        } catch (error) {
            return res.status(500).json({
                erro: "Erro interno no servidor.",
                detalhes: error.message
            });
        }
    },

//atualização da entrega
    atualizaEntrega: async (req, res) => {
        try {
            const { id } = req.query;

            const { status_entrega } = req.body;

            if (!id || !status_entrega) {
                return res.status(400).json({ erro: "ID da entrega e novo status devem ser fornecidos." });
            }

            const resultado = await entregaModel.atualizaEntrega(id, status_entrega);

            return res.status(200).json({
                mensagem: "Status da entrega atualizado com sucesso!",
                resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor.",
                erro: error.message
            });
        }
    },

    //exclusão da nova entrega
    deletaEntrga: async (req, res) => {
        try {
            const id = Number(req.params.id); 

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    erro: "ID da entrega deve ser fornecido e ser um número válido."
                });
            }

            const resultado = await entregaModel.deletaEntrega(id);

            return res.status(200).json({
                mensagem: "Entrega deletada com sucesso!",
                resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor.",
                erro: error.message
            });
        }
    }


}

module.exports = { entregaController };