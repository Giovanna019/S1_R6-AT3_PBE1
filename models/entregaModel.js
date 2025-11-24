const connection = require('../config/db')

const entregaModel = {

  // pega todas as entregas salvas no banco
  selecionarTodas: () => {
    const sql = 'SELECT * FROM entregas'
    return connection.promise().query(sql)
  },

  // busca uma entrega específica pelo ID
  selecionarPorId: (idEntrega) => {
    const sql = 'SELECT * FROM entregas WHERE idEntrega = ?'
    return connection.promise().query(sql, [idEntrega])
  },

  // cadastra uma nova entrega já com os valores calculados no controller
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

  // faz a atualização das informações de uma entrega já existente
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

  // remove uma entrega pelo ID
  deletarEntrega: (idEntrega) => {
    const sql = 'DELETE FROM entregas WHERE idEntrega = ?'
    return connection.promise().query(sql, [idEntrega])
  }
}

module.exports = { entregaModel }
