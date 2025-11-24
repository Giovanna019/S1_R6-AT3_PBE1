const mysql = require('mysql2/promise');
const pool = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'rapido_seguro',
    port: 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// só pra testar se está conectando certo
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao MySQL');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar no MySQL:', error);
    }
})();

// exportei pra usar nos models depois
module.exports = pool;
