const connection = require('../config/db')

const pedidoModel = {

  // pega todos os pedidos que já foram cadastrados
  selecionarTodos: () => {
    const sql = 'SELECT * FROM pedidos'
    return connection.promise().query(sql)
  },

  // busca um pedido específico pelo ID
  selecionarPorId: (idPedido) => {
    const sql = 'SELECT * FROM pedidos WHERE idPedido = ?'
    return connection.promise().query(sql, [idPedido])
  },

  // adiciona um novo pedido no banco
  // os valores principais já chegam prontos do controller
  inserirPedido: (dados) => {
    const sql = `
      INSERT INTO pedidos
      (idCliente, dataPedido, tipoEntrega, distancia, peso, valorKm, valorKg)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    return connection.promise().query(sql, [
      dados.idCliente,
      dados.dataPedido,
      dados.tipoEntrega,
      dados.distancia,
      dados.peso,
      dados.valorKm,
      dados.valorKg
    ])
  },

  // atualiza as informações de um pedido já existente
  atualizarPedido: (idPedido, dados) => {
    const sql = `
      UPDATE pedidos SET
        idCliente = ?, dataPedido = ?, tipoEntrega = ?,
        distancia = ?, peso = ?, valorKm = ?, valorKg = ?
      WHERE idPedido = ?
    `
    return connection.promise().query(sql, [
      dados.idCliente,
      dados.dataPedido,
      dados.tipoEntrega,
      dados.distancia,
      dados.peso,
      dados.valorKm,
      dados.valorKg,
      idPedido
    ])
  },

  // remove um pedido do banco pelo ID
  deletarPedido: (idPedido) => {
    const sql = 'DELETE FROM pedidos WHERE idPedido = ?'
    return connection.promise().query(sql, [idPedido])
  }
}

module.exports = { pedidoModel }
