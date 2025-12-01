const express = require('express');
  const {clienteRoutes} = require("./routes/clienteRoutes");
const {pedidoRoutes} = require("./routes/pedidoRoutes");
const {entregaRoutes} = require("./routes/entregaRoutes");

const app = express();
app.use(express.json());
app.use("/", clienteRoutes);
app.use("/", pedidoRoutes);
app.use("/", entregaRoutes);

// inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3008");
});