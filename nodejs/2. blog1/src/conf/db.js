const env = process.env.NODE_ENV; // environment

let MYSQL_CONF;

if (env === "dev") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "db_blog"
    };
}

if (env === "production") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "db_blog"
    };
}

module.exports = {
    MYSQL_CONF
};