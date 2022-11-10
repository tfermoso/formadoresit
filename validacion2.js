const mysql = require('mysql2');

const v = function comprobarUsuario(user, pass) {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER_DB,
        //pass: process.env.PASS_DB,
        database: process.env.DB
    });
    return connection.promise.execute(
        'SELECT * FROM users where username=? and password=?',
        [user, pass],
        function (err, results, fields) {
            let resultadoValidacion=(results.length > 0)            
            connection.end();
            return resultadoValidacion;
        }
    );
    
}


module.exports = v;