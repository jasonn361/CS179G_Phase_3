var mysql = require('mysql2');

var pool = mysql.createPool({
          connectionLimit : 10,
          host            : 'localhost',
          user            : 'root',
          password        : 'group3',
          database        : 'reviews',
});

module.exports = pool;
