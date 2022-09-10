const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: "localhost",
    user: 'nodejs',
    password: 'nodenode',
    database: 'opentutorials'
})

connection.query('select * from topic', (err, results) => {
    if (err) throw err;
    results.forEach(result => console.log(result))
    // console.log(`solution: ${}`)
})

connection.end()
