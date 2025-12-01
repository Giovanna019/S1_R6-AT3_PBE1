const pool = require('../config/db')

const clienteModel = {

    // pega geral
    selecionarTodos: async () => {
        try {
            const sql = 'SELECT * FROM clientes'
            const [rows] = await pool.query(sql)
            return rows
        } catch (e) {
            console.log("erro no model selecionarTodos:", e)
            throw e
        }
    },

    // pega por id
    selecionarPorId: async (id) => {
        try {
            const sql = 'SELECT * FROM clientes WHERE id_cliente = ?'
            const [rows] = await pool.query(sql, [id])
            if (rows.length === 0) return null
            return rows[0]
        } catch (e) {
            console.log("erro no model selecionarPorId:", e)
            throw e
        }
    },

    // insere novo (struct simples)
    inserirCliente: async (dados) => {
        try {
            const sql = `
                INSERT INTO clientes
                (nome, cpf, telefone, email, endereco)
                VALUES (?, ?, ?, ?, ?)
            `
            const { nome, cpf, telefone, email, endereco } = dados
            const [rows] = await pool.query(sql, [nome, cpf, telefone, email, endereco])
            return rows.insertId  
        } catch (e) {
            console.log("erro no model inserirCliente:", e)
            throw e
        }
    }
}

module.exports = { clienteModel }
