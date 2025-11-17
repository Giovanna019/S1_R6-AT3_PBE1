const express = require("express")
const cors = require("cors")

const clienteRoutes = require("./routes/clienteRoutes")
const pedidoRoutes = require("./routes/pedidoRoutes")
const entregaRoutes = require("./routes/entregaRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/clientes", clienteRoutes)
app.use("/pedidos", pedidoRoutes)
app.use("/entregas", entregaRoutes)

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})
