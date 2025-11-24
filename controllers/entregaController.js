const { entregaModel } = require("../models/entregaModel")

const entregaController = {

    // registra entrega já com o cálculo final
    calcularEntrega: async (req, res) => {
        try {
            const dados = req.body

            // calculando os valores (fiz separado pra ficar mais claro)
            const valorDistancia = dados.distancia * dados.valorKm
            const valorPeso = dados.peso * dados.valorKg

            const valorBase = valorDistancia + valorPeso

            // acréscimo se for urgente
            let acrescimo = 0
            if(dados.tipoEntrega === "urgente"){
                acrescimo = valorBase * 0.20
            }

            let valorFinal = valorBase + acrescimo

            // desconto se passar de 500
            let desconto = 0
            if(valorFinal > 500){
                desconto = valorFinal * 0.10
                valorFinal -= desconto
            }

            // taxa extra se pesar mais de 50kg
            let taxaExtra = 0
            if(dados.peso > 50){
                taxaExtra = 15
                valorFinal += taxaExtra
            }

            const registro = {
                idPedido: dados.idPedido,
                valorDistancia,
                valorPeso,
                acrescimo,
                desconto,
                taxaExtra,
                valorFinal,
                statusEntrega: "calculado"
            }

            const resultado = await entregaModel.registrarEntrega(registro)

            res.status(201).json({
                mensagem: "Entrega registrada!",
                id: resultado.insertId,
                calculo: registro
            })

        } catch (erro) {
            console.log("Erro ao calcular entrega:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    },

    // lista todas as entregas
    listarEntregas: async (req, res) => {
        try {
            const [lista] = await entregaModel.listarEntregas()
            res.json(lista)
        } catch (erro) {
            console.log("Erro ao listar entregas:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    }
}

module.exports = { entregaController }
