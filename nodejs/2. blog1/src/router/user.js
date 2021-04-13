const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    console.log('smgmtstring is :', d.toGMTString());
    return d.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method;

    // login
    if (method === "GET" && req.path === "/api/user/login") {
        // if (result) {
        //     return new SuccessModel();
        // } else {
        //     return new ErrorModel("login fails");
        // }
        
        // const { username, password } = req.body;
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if(data.username) {
                // set cookie, 
                //   path=/ means valid for every router
                //   httpOnly makes frontend cannot change cookie username
                //   expires : set cookie expired date
                res.setHeader(
                    "Set-Cookie",
                    `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`
                );
                return new SuccessModel();
            } else {
                return new ErrorModel("login fails");
            }
        });
        
    }

    // login test
    if (method === "GET" && req.path === "/api/user/login-test") {
        if (req.cookie.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.cookie.username
                })
            );
        }
        return Promise.resolve(new ErrorModel("have not login"));
    }
}

module.exports = handleUserRouter;  