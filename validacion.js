const mysql = require('mysql2');

const v = function comprobarUsuario(user, pass,callback) {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER_DB,
        //pass: process.env.PASS_DB,
        database: process.env.DB
    });
    connection.execute(
        'SELECT * FROM users where username=? and password=?',
        [user, pass],
        function (err, results, fields) {
            let resultadoValidacion=(results.length > 0)
            connection.end();
            callback(resultadoValidacion)
        }
    );
    
}


module.exports = v;