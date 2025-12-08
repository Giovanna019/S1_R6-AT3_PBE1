const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: "10.87.169.87",
    user: "giovanna",
    password: "MySQL1234",
    port:3308,
    database: "Rápido_Seguro",
    waitForConnections: true,
    connectionLimit: 10
})

module.exports = pool;
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao MySQL')
        connection.release()
    } catch (error) {
        console.error(`Erro ao conectar ao MySQL: ${error}`);
    }
})();