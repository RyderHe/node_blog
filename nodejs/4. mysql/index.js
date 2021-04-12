const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "db_blog"
});

connection.connect();

const sql = "select id, username from tbl_users";
connection.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
})
connection.end();