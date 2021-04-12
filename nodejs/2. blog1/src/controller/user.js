const loginCheck = (username, password) => {
    // use fake data
    if (username === "zhangsan" && password === "123") {
        return true;
    }
    return false; 
}

module.exports = {
    loginCheck
};