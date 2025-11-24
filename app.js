const express = require("express")
const cors = require("cors")

// importando as rotas separadas pra deixar o projeto mais organizado
const clienteRoutes = require("./routes/clienteRoutes")
const pedidoRoutes = require("./routes/pedidoRoutes")
const entregaRoutes = require("./routes/entregaRoutes")

const app = express()

// habilita o cors pra evitar erro quando testar no front
app.use(cors())

// deixa o express entender JSON no corpo das requisições
app.use(express.json())

// definindo os caminhos principais das rotas
app.use("/clientes", clienteRoutes)
app.use("/pedidos", pedidoRoutes)
app.use("/entregas", entregaRoutes)

// inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})
