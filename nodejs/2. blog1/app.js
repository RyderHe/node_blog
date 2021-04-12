const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const querystring = require("querystring");

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({});
            return;
        }
        if (req.headers["content-type"] !== "application/json") {
            resolve({});
            return;          
        }
        

        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        });

        req.on("end", () => {
            req.postData = postData;
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            );
        });
    });
    return promise;
}

const serverHandle = (req, res) => {
    
    // set response type
    res.setHeader("Content-type", "application/json");


    // retrieve path
    const url = req.url;
    req.path = url.split("?")[0];

    // query
    req.query = querystring.parse(url.split("?")[1]);

    // post data
    getPostData(req)
    .then(postData => {
        req.body = postData

        // blog router
        const blogData = handleBlogRouter(req, res);
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            );
            return;
        }
   
        // user router
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            );
            return;
        }

        // unmatched routes, return 404
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 not found\n");
        res.end();
    })

}

module.exports = serverHandle;