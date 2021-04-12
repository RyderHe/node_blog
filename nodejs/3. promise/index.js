const fs = require("fs");
const path = require("path");

// // callback method - to get one file content
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, "files", fileName);
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         callback(
//             JSON.parse(data.toString())
//         );
//     })
// }

// getFileContent("a.json", aData => {
//     console.log("a data", aData);
//     getFileContent(aData.next, bData => {
//         console.log("b data", bData);
//         getFileContent(bData.next, cData => {
//             console.log("c data", cData);
//         })
//     });
// }); // this is callback-hell - a big problem!

// Use Promise to solve callback hell
function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, "files", fileName);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toString())
            );
        })
    });
    return promise;
}

getFileContent("a.json")
.then(aData => {
    console.log("a data", aData);
    return getFileContent(aData.next);
})
.then(bData => {
    console.log("b data", bData);
    return getFileContent(bData.next);
})
.then(cData => {
    console.log("c data", cData);
    // return getFileContent(bData.next);
});

// async/await - in koa2

