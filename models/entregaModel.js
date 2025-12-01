const pool = require('../config/db');
const entregaModel = {
  
    // todas as entregas
    TodasEntregas: async () => {
        const connection = await pool.getConnection();
        try {
            const sql = 'SELECT * FROM entregas';
            const [rows] = await connection.query(sql);
            return rows;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },

    //criar uma nova entrega com valores do pedido
    
    criarNovaEntrega: async (id_pedido_fk, status_entrega = 'pendente') => {
        const connection = await pool.getConnection();
        const VALOR_KM = 10;
        const VALOR_KG = 20;
        const TAXA_PESO_EXTRA = 15;

        try {
            await connection.beginTransaction();

            //DADOS DO PEDIDO
            const sqlBuscaPedido = `
            SELECT distancia_km, peso_kg, tipo_entrega 
            FROM pedidos 
            WHERE IdPedido = ?
        `;

            const [pedido] = await connection.query(sqlBuscaPedido, [id_pedido_fk]);

            if (pedido.length === 0) {
                throw new Error("Pedido informado não existe.");
            }

            const { distancia_km, peso_kg, tipo_entrega } = pedido[0];

            // contas
            const valor_distancia = distancia_km * VALOR_KM;
            const valor_peso = peso_kg * VALOR_KG;
            const valor_base = valor_distancia + valor_peso;

            const acrescimo = tipo_entrega === "urgente" ? valor_base * 0.20 : 0;

            let valor_final = valor_base + acrescimo;

            // desconto
            const desconto = valor_final > 500 ? valor_final * 0.10 : 0;

            valor_final -= desconto;

            // taxa extra
            const taxa_extra = peso_kg > 50 ? TAXA_PESO_EXTRA : 0;
            valor_final += taxa_extra;

            const sqlInsert = `
            INSERT INTO entregas 
            (id_pedido_fk, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

            const values = [
                id_pedido_fk,
                valor_distancia,
                valor_peso,
                acrescimo,
                desconto,
                taxa_extra,
                valor_final,
                status_entrega
            ];

            const [result] = await connection.query(sqlInsert, values);

            await connection.commit();

            return {
                id_entrega: result.insertId,
                id_pedido_fk,
                valor_distancia,
                valor_peso,
                acrescimo,
                desconto,
                taxa_extra,
                valor_final,
                status_entrega
            };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },



    atualizaEntrega: async (idEntrega, status_entrega) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'UPDATE entregas SET status_entrega = ? WHERE IDEntrega = ?';
            const values = [status_entrega, idEntrega];

            const [result] = await connection.query(sql, values);

            return {
                affectedRows: result.affectedRows,
                changedRows: result.changedRows
            };
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    },
// delete de entreega
    deletaEntrega: async (idEntrega) => {
        const connection = await pool.getConnection();
        try {
            const sql = 'DELETE FROM entregas WHERE IDEntrega = ?';
            const values = [idEntrega];
            const [result] = await connection.query(sql, values);

            return {
                affectedRows: result.affectedRows
            };
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }

    },
}

module.exports = { entregaModel };