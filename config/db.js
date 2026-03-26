const mysql = require('mysql2');
const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1173@mdnawaz',
    database: 'healtech_connect'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL :', err);
        return;
    }
    console.log('Connected to MySQL');
})

module.exports = db; 

// console.log(db.execute("SHOW DATABASES"));