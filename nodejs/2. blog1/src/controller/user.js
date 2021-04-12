const { exec } = require("../db/mysql");

const loginCheck = (username, password) => {
    // // use fake data
    // if (username === "zhangsan" && password === "123") {
    //     return true;
    // }
    // return false; 

     const sql = `
        SELECT username, firstname, lastname from tbl_users 
        WHERE username='${username}' AND password='${password}'
     `;

     return exec(sql).then(rows => {
         return rows[0] || {};
     });
}

module.exports = {
    loginCheck
};