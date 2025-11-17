const connection = require('../config/db')

const pedidoModel = {

  // busca todos os pedidos cadastrados
  selecionarTodos: () => {
    const sql = 'SELECT * FROM pedidos'
    return connection.promise().query(sql)
  },

  // busca pedido pelo ID
  selecionarPorId: (idPedido) => {
    const sql = 'SELECT * FROM pedidos WHERE idPedido = ?'
    return connection.promise().query(sql, [idPedido])
  },

  // insere novo pedido
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

  // atualiza um pedido existente
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

  // exclui pedido
  deletarPedido: (idPedido) => {
    const sql = 'DELETE FROM pedidos WHERE idPedido = ?'
    return connection.promise().query(sql, [idPedido])
  }
}

module.exports = { pedidoModel }
