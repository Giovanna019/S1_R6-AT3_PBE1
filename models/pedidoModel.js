const pool = require('../config/db');
//valores
const VALOR_BASE_KM = 10;
const VALOR_BASE_KG = 25;
const VALOR_PESO_TAXA = 15; // taxa adicional 
const PedidoModel = {

    //criação de pedido
    
    criarPedido: async (
        id_cliente,
        data_pedido,
        tipo_entrega,
        distancia_km,
        peso_kg
    ) => {

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Verifica se o cliente existe
            const sqlVerificaCliente = 'SELECT id_Cliente FROM clientes WHERE id_cliente = ?';
            const [clienteExiste] = await connection.query(sqlVerificaCliente, [id_cliente]);

            //  CÁLCULOS 
            const valor_km = distancia_km * VALOR_BASE_KM;
            let valor_kg = peso_kg * VALOR_BASE_KG;
            
            let valor_total = valor_km + valor_kg;
            

            // Entrega urgente 
            if (tipo_entrega === "urgente") {
                valor_total *= 1.3;
            }
            // Taxa adicional 
            if (peso_kg > 50) {
                valor_kg += VALOR_PESO_TAXA;
            }
            if (valor_total > 500) {
                valor_total *= 0.9; // Aplica desconto de 10%
            }
            // Insere pedido
            const sql = `
                INSERT INTO pedido
                (id_cliente, data_pedido, tipo_entrega, distancia_pedido, peso_carga, valor_km_pedido, valor_kg_peso)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                id_cliente,
                data_pedido,
                tipo_entrega,
                distancia_km,
                peso_kg,
                valor_km,
                valor_kg,
                valor_total
            ];

            const [rowsPedido] = await connection.query(sql, values);

            await connection.commit();

            return {
                id_pedido: rowsPedido.insertId,
                valor_total,
                valor_km,
                valor_kg
            };

        } catch (error) {
            await connection.rollback();
            throw error;

        } finally {
            connection.release();
        }
    },



    // Seleciona os pedido
    
    selecionaTodospedido: async () => {
        const connection = await pool.getConnection();

        try {
            const sql = 'SELECT * FROM pedido';
            const [rows] = await connection.query(sql);
            return rows;

        } catch (error) {
            throw error;

        } finally {
            connection.release();
        }
    },


    // Seleciona pedido 
    
    selecionaPedidoPorId: async (id) => {
        const connection = await pool.getConnection();

        try {
            const sql = 'SELECT * FROM pedido WHERE id_cliente = ?';
            const [rows] = await connection.query(sql, [id]);
            return rows.length > 0 ? rows[0] : null;

        } catch (error) {
            throw error;

        } finally {
            connection.release();
        }
    },
    
    //atualização de pedido
    atualizaPedido : async (id_pedido, tipo_entrega, distancia_km, peso_kg) => {
    const connection = await pool.getConnection();

    // contas fixas
    const VALOR_BASE_KM = 10;
    const VALOR_BASE_KG = 20;
    const TAXA_PESO_EXTRA = 15;

    try {
        await connection.beginTransaction();

        
        const valor_km = distancia_km * VALOR_BASE_KM;
        let valor_kg = peso_kg * VALOR_BASE_KG;
        let valor_total = valor_km + valor_kg;

        // acréscimo 
        if (tipo_entrega === "urgente") {
            valor_total *= 1.30;
        }

        // taxa extra 
        let taxa_extra = 0;
        if (peso_kg > 50) {
            taxa_extra = TAXA_PESO_EXTRA;
            valor_kg += taxa_extra;
            valor_total += taxa_extra;
        }

        // desconto 
        let desconto = 0;
        if (valor_total > 500) {
            desconto = valor_total * 0.10;
            valor_total -= desconto;
        }
 
        const sql = `
            UPDATE pedido
            SET tipo_entrega = ?, 
                distancia_km = ?, 
                peso_kg = ?, 
                valor_km = ?, 
                valor_kg = ?,  
                valor_total = ?
            WHERE IDPedido = ?
        `;
 
        const values = [
            tipo_entrega,
            distancia_km,
            peso_kg,
            valor_km,
            valor_kg,
            valor_total,
            id_pedido
        ];
 
        const [rows] = await connection.query(sql, values);
 
        await connection.commit();
        return rows;
 
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
},
//Deleta um pedido do banco de dados 
 
    DeletaPedido: async (id_pedido) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'DELETE FROM pedido WHERE IDPedido = ?';
            const values = [id_pedido];
            const [result] = await connection.query(sql, values);
            connection.commit();
            return result;
        } catch (error) {
            connection.rollback();
            throw error;
        }
    }
 
};

module.exports = PedidoModel;

