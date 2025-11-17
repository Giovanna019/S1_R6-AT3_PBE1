const db = require('../config/db')

const clienteModel = {

  // Buscar todos os clientes
  selecionarTodos: () => {
    const sql = 'SELECT * FROM clientes'
    return db.promise().query(sql)
  },

  // Buscar cliente pelo CPF
  selecionarPorCpf: (cpfCliente) => {
    const sql = 'SELECT * FROM clientes WHERE cpfCliente = ?'
    return db.promise().query(sql, [cpfCliente])
  },

  // Buscar cliente pelo ID
  selecionarPorId: (idCliente) => {
    const sql = 'SELECT * FROM clientes WHERE idCliente = ?'
    return db.promise().query(sql, [idCliente])
  },

  // Inserir novo cliente
  inserirCliente: (nomeCliente, cpfCliente) => {
    const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente) VALUES (?, ?)'
    return db.promise().query(sql, [nomeCliente, cpfCliente])
  },

  // Atualizar cliente existente
  atualizarCliente: (idCliente, nomeCliente, cpfCliente) => {
    const sql = 'UPDATE clientes SET nomeCliente = ?, cpfCliente = ? WHERE idCliente = ?'
    return db.promise().query(sql, [nomeCliente, cpfCliente, idCliente])
  },

  // Deletar cliente pelo ID
  deletarCliente: (idCliente) => {
    const sql = 'DELETE FROM clientes WHERE idCliente = ?'
    return db.promise().query(sql, [idCliente])
  }
}

module.exports = { clienteModel }
