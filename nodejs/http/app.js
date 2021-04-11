const http = require("http");
const querystring = require("querystring");

// GET
const server = http.createServer((req, res) => {
    console.log("method: ", req.method); // GET
    const url = req.url;
    console.log("url: ", url);
    req.query = querystring.parse(url.split("?")[1]);
    console.log("query: ", req.query);
    res.end(
        JSON.stringify(req.query)
    );
});

// POST
const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        // req data type
        console.log("req content-type: ", req.headers["content-type"]);
        // post data
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        })
        req.on("end", () => {
            console.log("postData: ", postData);
            res.end("hello world!"); // text/html
        })
    }
});

// routing
const server = http.createServer((req, res) => {
    const url = req.url;
    const path = url.split("?")[0];
    res.end(path); // routing / path
});

// Conclusion - example
const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split("?")[0];
    const query = querystring.parse(url.split("?")[1]);

    // set res data type to json
    req.setHeader("Content-type","application/json"); // text/html
    
    // set res sata
    const resData = {
        method,
        url,
        path,
        query
    };


    // respond to frontend
    if (method === "GET") {
        res.end(
            JSON.stringify(resData) // json
        );
    }

    if (method === "POST") {
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        });
        req.on("end", () => {
            resData = postData;
            res.end(
                JSON.stringify(resData) // json
            );

        });
    }
});

server.listen(8000, () => {
    console.log("server is running on port 8000");
});

