const pool = require('../config/db'); // ajuste o caminho conforme seu projeto
const ClienteModel = {

    // Criar novo cliente
    /**
     * @param {string} nome_completo 
     * @param {*} cpf 
     * @param {*} email 
     * @param {*} logradouro 
     * @param {*} numero 
     * @param {*} bairro 
     * @param {*} cidade 
     * @param {*} estado 
     * @param {*} cep 
     * @param {*} telefones 
     * @returns dados do cliente e dos telefones cadastrados
     * @example
     * entrada de dados via json
     * {
     *  "nome_completo": "Giovanna vitória",
     *  "cpf": "123.456.789-00",
     *  "logradouro": "logradouro",
     * "numero": "100",
     * "bairro": "Nova veneza",
     * "cidade": "Sumaré",
     * "estado": "sp",
     * "cep": "12345-678",
     * "telefones": ["(11) 91234-5678", "(11) 99876-5432"]
     * }
     *
     * // Output:
     * {
     *   cliente: { insertId: 1, affectedRows: 1, ... },
     *  telefones: [ { insertId: 1, affectedRows: 1, ... }, { insertId: 2, affectedRows: 1, ... } ]
     * }
     *  insomnia 
     * {
     *  "cliente": {
     *    "insertId": 1,
     *   "affectedRows": 1,
     *   ...
     * },
     * "telefones": [
     *   { "insertId": 1, "affectedRows": 1, ... },
     *  { "insertId": 2, "affectedRows": 1, ... }
     * ]
     */
    criarCliente: async (nome_completo, cpf, email, logradouro, numero, bairro, cidade, estado, cep, telefones = []) => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Verifica se o nome completo 
            const sqlVerificaNome = 'SELECT nome_completo FROM clientes WHERE nome_completo = ?';
            const [nomeExistente] = await connection.query(sqlVerificaNome, [nome_completo]);

            if (nomeExistente.length > 0) {
                throw new Error('Nome completo já cadastrado');
            }

            // Insere cliente
            const sqlCliente = `
                INSERT INTO clientes 
                (nome_completo, cpf, email, logradouro, numero, bairro, cidade, estado, cep)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const valuesCliente = [
                nome_completo,
                cpf,
                email,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep
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
                UPDATE clientes
                SET nome_completo = ?, cpf = ?, email = ?, logradouro = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, cep = ?
                WHERE IDCliente = ?
            `;

            const values = [
                nome_completo,
                cpf,
                email,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                id_cliente
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