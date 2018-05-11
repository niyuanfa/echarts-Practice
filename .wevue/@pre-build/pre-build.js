"use strict";
let fs = require('fs')
let path = require('path')
console.log("init...")
function checkFileExist(filePath) {
    let result = false
    if (!filePath) {
        return result
    }
    try {
        result = fs.statSync(filePath)
    } catch (e) {
        result = false
    }
    return !!result
}

function prepareWevueFiles(relativePath) {
    let wevueRootPath = path.resolve(__dirname, "../")
    let wevueSrcPath = path.resolve(wevueRootPath, "./src", relativePath || "")


    let wevueTemplateSrcPath = path.resolve(__dirname, "./prepare-project-template-file/src", relativePath || "")
    let templateFiles = fs.readdirSync(wevueTemplateSrcPath)
    let targetFolderFiles = fs.readdirSync(wevueSrcPath)
    let fileTest = /\./
    for (let i = 0 ; i< templateFiles.length ; i ++) {
        if (fileTest.test(templateFiles[i])) {
            let hasFile = checkFileExist(path.resolve(wevueSrcPath, templateFiles[i]))
            if (!hasFile) {
                let newFileContent = fs.readFileSync(path.resolve(wevueTemplateSrcPath, templateFiles[i]))
                fs.writeFileSync(path.resolve(wevueSrcPath, templateFiles[i]), newFileContent)
            }
        } else {
            let hasFolder = checkFileExist(path.resolve(wevueSrcPath, templateFiles[i]))
            if (!hasFolder) {
                fs.mkdirSync(path.resolve(wevueSrcPath, templateFiles[i]))
                prepareWevueFiles(path.join((relativePath || ""), templateFiles[i]))
            } else {
                prepareWevueFiles(path.join((relativePath || ""), templateFiles[i]))
            }
        }
    }
}
let hasWevueSrcFolder = checkFileExist(path.resolve(__dirname,"../src"))

if(!hasWevueSrcFolder){
    fs.mkdirSync(path.resolve(__dirname,"../src"))
}


function initFileContentWithEnv(){
    let wevueRootPath = path.resolve(__dirname, "../")
    let wevueAppPath = path.resolve(wevueRootPath, "./src", "app.json")
    let content = fs.readFileSync(wevueAppPath,'utf8')
    let envs = process.env||{}
    for(let i in envs){
        let key = '$$'+i
        content = content.replace(key,envs[i])
    }
    fs.writeFileSync(wevueAppPath,content,'utf8')
}
prepareWevueFiles()
initFileContentWithEnv()
console.log("init done")