const getList = (author, keyword) => {
    // fake data
    return [
        {
            id: 1,
            title: "title-A",
            content: "content-A",
            createdTime: 1618176643023,
            author: "zhangsan"
        },
        {
            id: 2,
            title: "title-B",
            content: "content-B",
            createdTime: 1618176687539,
            author: "lisi"
        },
    ]
};

const getDetail = (id) => {
    // fake data
    return [
        {
            id: 1,
            title: "title-A",
            content: "content-A",
            createdTime: 1618176643023,
            author: "zhangsan"
        }
    ]
}

const newBlog = (blogData = {}) => {
    // blogData includes title, content etc

    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    // blogData includes title, content etc
    console.log("update blog: ", id, blogData);

    return false;
}

const deleteBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}