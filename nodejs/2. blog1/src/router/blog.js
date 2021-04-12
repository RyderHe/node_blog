const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;

    // get blog list
    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || "";
        const keyword = req.query.keyword || "";
        // const listData = getList(author, keyword);
        
        // return new SuccessModel(listData); 
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData); 
        })
    }
    
    // get blog detail
    if (method === "GET" && req.path === "/api/blog/detail") {
        // const data = getDetail(id);
        // return new SuccessModel(data); 
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }   

    // create new blog
    if (method === "POST" && req.path === "/api/blog/new") {
        const blogData = req.body;
        // const data = newBlog(blogData);
        // return new SuccessModel(data); 
        const author = "tempauthor"; // fake until login
        req.body.author = author;

        const result = newBlog(blogData);
        return result.then(data => {
            return new SuccessModel(data);
        });

    }   

    // update existing blog
    if (method === "POST" && req.path === "/api/blog/update") {
        
        const blogData = req.body;
        const result = updateBlog(id, blogData);
        return result.then(val => {
            if (val) {
                return new SuccessModel(); 
            } else {
                return new ErrorModel("update blog fails");
            }
        })
    }  

    // delete existing blog
    if (method === "POST" && req.path === "/api/blog/delete") {
        const author = "tempauthor"; // fake until login

        const result = deleteBlog(id, author);

        return result.then(val => {
            if (val) {
                return new SuccessModel(); 
            } else {
                return new ErrorModel("delete blog fails");
            } 
        })
    }  
}

module.exports = handleBlogRouter;