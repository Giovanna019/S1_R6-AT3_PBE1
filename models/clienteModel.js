const pool = require('../config/db'); // ajuste o caminho conforme seu projeto
const ClienteModel = {

    // Criar novo cliente
    
    criarCliente: async (nome_cliente, cpf_cliente, email_cliente, id_cliente, endereco_cliente,telefones = []) => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Verifica se o nome completo 
            const sqlVerificaNome = 'SELECT nome_cliente FROM clientes WHERE nome_cliente= ?';
            const [nomeExistente] = await connection.query(sqlVerificaNome, [nome_cliente]);

            if (nomeExistente.length > 0) {
                throw new Error('Nome completo já cadastrado');
            }

            // Insere cliente
            const sqlCliente = `
                INSERT INTO clientes 
                (id_cliente, nome_cliente, cpf_cliente, emailcliente, endereco_cliente)
                VALUES (?, ?, ?, ?, ?);`;

            const valuesCliente = [
              id_cliente,
            nome_cliente,
            cpf_cliente,
            email_cliente,
            endereco_cliente
            ];

            const [rowsCliente] = await connection.query(sqlCliente, valuesCliente);
            const clienteId = rowsCliente.insertId;

            // Insere o telefone
            const resultadosTelefones = [];

            if (telefones.length > 0) {
                const sqlTelefone = `
                    INSERT INTO telefones (id_cliente_fk, telefone)
                    VALUES (?, ?)
                `;

                for (const tel of telefones) {
                    const [rowsTel] = await connection.query(sqlTelefone, [clienteId, tel]);
                    resultadosTelefones.push(rowsTel);
                }
            }

            await connection.commit();

            return {
                cliente: rowsCliente,
                telefones: resultadosTelefones
            };

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    // Seleciona  os clientes
   
    selecionaTodosClientes: async () => {
        const connection = await pool.getConnection();

        try {
            const sql = 'SELECT * FROM clientes';
            const [rows] = await connection.query(sql);
            return rows;

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    //Atualizar cliente 
    
    atualizaCliente: async (id_cliente, nome_completo, cpf, email, logradouro, numero, bairro, cidade, estado, cep) => {
        const connection = await pool.getConnection();

        try {
            const sql = `
                INSERT INTO clientes
                (id_cliente, nome_cliente, cpf_cliente, email_cliente, endereco_cliente)
                VALUES (?, ?, ?, ?, ?);`;

            const values = [
             id_cliente,
            nome_cliente,
            cpf_cliente,
            email_cliente,
            endereco_cliente
            ];

            const [rows] = await connection.query(sql, values);
            await connection.commit();
            return rows;

        } catch (error) {
            await connection.rollback();
            throw error;
            
        }   
    },

    selecionarClientePorCpf: async (cpf) => {
        const connection = await pool.getConnection();

        try {
            const sql = 'SELECT * FROM clientes WHERE cpf = ?';
            const [rows] = await connection.query(sql, [cpf]);
            return rows[0];

        } catch (error) {
            throw error;
        }
    },

//delete do cliente
    deleteCliente: async (id_cliente) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'DELETE FROM clientes WHERE IDCliente = ?';
            const [rows] = await connection.query(sql, [id_cliente]);
            connection.commit();
            return rows;
        } catch (error) {
            console.log(error);
            connection.rollback();
            throw error;
        }
    }
    
};
module.exports = {ClienteModel};