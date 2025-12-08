const pool = require('../config/db');

const clienteModel = {

    // Criar novo cliente
    criarCliente: async (nome_cliente, cpf_cliente, email_cliente, endereco_cliente, telefones = []) => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Verifica se o nome já existe
            const sqlVerificaNome = 'SELECT nome_cliente FROM clientes WHERE nome_cliente = ?';
            const [nomeExistente] = await connection.query(sqlVerificaNome, [nome_cliente]);

            if (nomeExistente.length > 0) {
                throw new Error('Nome completo já está cadastrado');
            }

            // Insere cliente
            const sqlCliente = `
                INSERT INTO clientes 
                (nome_cliente, cpf_cliente, email_cliente, endereco_cliente)
                VALUES (?, ?, ?, ?)
            `;

            const [resultCliente] = await connection.query(sqlCliente, [
                nome_cliente,
                cpf_cliente,
                email_cliente,
                endereco_cliente
            ]);

            const clienteId = resultCliente.insertId;

            // Telefones
            const resultadosTelefones = [];

            if (telefones.length > 0) {
                const sqlTelefone = `
                    INSERT INTO telefones (id_cliente_fk, telefone)
                    VALUES (?, ?)
                `;

                for (const tel of telefones) {
                    const [telResult] = await connection.query(sqlTelefone, [clienteId, tel]);
                    resultadosTelefones.push(telResult);
                }
            }

            await connection.commit();

            return {
                cliente: resultCliente,
                telefones: resultadosTelefones
            };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    // Selecionar todos os clientes
    selecionaTodosClientes: async () => {
        const [rows] = await pool.query('SELECT * FROM clientes');
        return rows;
    },

    // Selecionar cliente por CPF
    selecionarClientePorCpf: async (cpf_cliente) => {
        const [rows] = await pool.query(
            'SELECT * FROM clientes WHERE cpf_cliente = ?',
            [cpf_cliente]
        );
        return rows[0];
    },

    // Atualizar cliente
    atualizaCliente: async (id_cliente, nome_cliente, cpf_cliente, email_cliente, endereco_cliente) => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const sql = `
                UPDATE clientes 
                SET nome_cliente = ?, cpf_cliente = ?, email_cliente = ?, endereco_cliente = ?
                WHERE id_cliente = ?
            `;

            const [result] = await connection.query(sql, [
                nome_cliente,
                cpf_cliente,
                email_cliente,
                endereco_cliente,
                id_cliente
            ]);

            await connection.commit();
            return result;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    // Deletar cliente
    deleteCliente: async (id_cliente) => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
            const [result] = await connection.query(sql, [id_cliente]);

            await connection.commit();
            return result;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

};

module.exports = { clienteModel };
