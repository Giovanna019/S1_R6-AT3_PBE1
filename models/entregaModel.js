const connection = require('../config/db')

const entregaModel = {

  // busca todas as entregas cadastradas
  selecionarTodas: () => {
    const sql = 'SELECT * FROM entregas'
    return connection.promise().query(sql)
  },

  // busca entrega pelo ID
  selecionarPorId: (idEntrega) => {
    const sql = 'SELECT * FROM entregas WHERE idEntrega = ?'
    return connection.promise().query(sql, [idEntrega])
  },

  // insere entrega (já com os cálculos)
  inserirEntrega: (dados) => {
    const sql = `
      INSERT INTO entregas
      (idPedido, valorDistancia, valorPeso, acrescimo, desconto, taxaExtra, valorFinal, statusEntrega)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    return connection.promise().query(sql, [
      dados.idPedido,
      dados.valorDistancia,
      dados.valorPeso,
      dados.acrescimo,
      dados.desconto,
      dados.taxaExtra,
      dados.valorFinal,
      dados.statusEntrega
    ])
  },

  // atualiza entrega
  atualizarEntrega: (idEntrega, dados) => {
    const sql = `
      UPDATE entregas SET
        valorDistancia = ?, valorPeso = ?, acrescimo = ?, desconto = ?,
        taxaExtra = ?, valorFinal = ?, statusEntrega = ?
      WHERE idEntrega = ?
    `
    return connection.promise().query(sql, [
      dados.valorDistancia,
      dados.valorPeso,
      dados.acrescimo,
      dados.desconto,
      dados.taxaExtra,
      dados.valorFinal,
      dados.statusEntrega,
      idEntrega
    ])
  },

  // exclui entrega
  deletarEntrega: (idEntrega) => {
    const sql = 'DELETE FROM entregas WHERE idEntrega = ?'
    return connection.promise().query(sql, [idEntrega])
  }
}

module.exports = { entregaModel }
