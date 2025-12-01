const pool = require('../config/db');
const telefoneModel = {

    // Função para adicionar um novo telefone

    adicionarTelefone: async (id_cliente, numero_telefone) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'INSERT INTO telefones (id_cliente_fk, telefone) VALUES (?, ?)';
            const values = [id_cliente, numero_telefone];
            const [result] = await connection.query(sql, values);
            connection.commit();
            return result.insertId;
        } catch (error) {
            connection.rollback();
            throw error;
        }

    },

   //atualização

    atualizaTelefone: async (id_telefone, novo_numero) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'UPDATE telefones SET telefone = ? WHERE IDTelefone = ?';
            const values = [novo_numero, id_telefone];
            const [rows] = await connection.query(sql, values);
            connection.commit();
            return [rows];
        } catch (error) {
            connection.rollback();
            throw error;

        }
    },
  
    //seleçao

    selecionaTodosTelefones: async () => {
        try {
            const connection = await pool.getConnection();
            const sql = 'SELECT * FROM telefones';
            const [rows] = await connection.query(sql);
            return rows;

        } catch (error) {
            connection.rollback();
            throw error;

        }
    },

 // Deletar Telefone
   
    deleteTelefone: async (id_telefone) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'DELETE FROM telefones WHERE IDTelefone = ?';
            const values = [id_telefone];
            const [result] = await connection.query(sql, values);
            connection.commit();
            return result;
        } catch (error) {
            connection.rollback();
            throw error;
        }
    },

    // Selecionar Telefone por ID
    
    selecionaTelefonePorId: async (id_telefone) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'SELECT * FROM telefones WHERE IDTelefone = ?';
            const values = [id_telefone];
            const [rows] = await connection.query(sql, values);
            connection.commit();
            return rows;
        } catch (error) {
            connection.rollback();
            throw error;
        }}
};

module.exports = { telefoneModel };