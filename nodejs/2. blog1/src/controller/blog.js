const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
    let sql = ` SELECT * FROM tbl_blogs WHERE 1=1 `;
    if (author) {
        sql += `AND author='${author}' `;
    }
    if (keyword) {
        sql += `AND title LIKE '%${keyword}%' `;
    }

    sql += `ORDER BY createdtime DESC`;

    return exec(sql); // promise

}

const getDetail = (id) => {
    let sql = `SELECT * FROM tbl_blogs WHERE id='${id}'`;
    return exec(sql).then(rows => {
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
    // blogData includes title, content etc
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createdTime = Date.now();
    const sql = `
        INSERT INTO tbl_blogs (title, content, createdtime, author)
        values ('${title}', '${content}', '${createdTime}', '${author}')
    `;

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        };
    });
}

const updateBlog = (id, blogData = {}) => {
    // blogData includes title, content etc
    // console.log("update blog: ", id, blogData);

    // return false;
    const title = blogData.title;
    const content = blogData.content;

    const sql = `
        UPDATE tbl_blogs SET title='${title}', content='${content}' 
        WHERE id=${id}
    `;

    return exec(sql).then(updateData => {
        console.log(updateData);

        if (updateData.affectedRows > 0) {
            return true;
        }

        return false;
    });
}

const deleteBlog = (id, author) => {
    // return true;

    // safety issue
    const sql = `
        DELETE FROM tbl_blogs WHERE id=${id} AND author='${author}'
    `;

    return exec(sql).then(deleteData => {
        // console.log(deleteData);

        if (deleteData.affectedRows > 0) {
            return true;
        }

        return false;
    });
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}