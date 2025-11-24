const pool = require('../config/db');

const clienteModel = {

    /**
     * Busca todos os clientes cadastrados.
     */
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows; // retorna a lista completa
    },

    /**
     * Procura um cliente pelo id.
     * @param {number} id id do cliente
     */
    selecionarPorId: async (id) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows; // retorna só o cliente encontrado
    },

    /**
     * Cadastra um cliente novo.
     * @param {string} nome nome do cliente
     * @param {string} cpf cpf do cliente
     */
    inserirCliente: async (nome, cpf) => {
        const sql = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?)';
        const values = [nome, cpf];
        const [rows] = await pool.query(sql, values);
        return rows; // resultado do insert
    },

    /**
     * Atualiza um cliente existente.
     * @param {string} nome novo nome
     * @param {string} cpf novo cpf
     * @param {number} id id do cliente
     */
    alterarCliente: async (nome, cpf, id) => {
        const sql = 'UPDATE clientes SET nome = ?, cpf = ? WHERE id_cliente = ?';
        const values = [nome, cpf, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Deleta um cliente pelo id.
     * @param {number} id id do cliente
     */
    deleteCliente: async (id) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

module.exports = { clienteModel };
