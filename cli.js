#! /usr/bin/env node
const fs = require('fs')
const join = require('path').join
const inquirer = require('inquirer')
const ejs = require('ejs')

function fs_mkdirs(destDir) {
    fs.mkdirSync(destDir,err =>{
        if(err) throw err
    })
    fs.mkdirSync(`${destDir}/notes`,err => {
        if(err) throw err
    })
    fs.mkdirSync(`${destDir}/code`,err => {
        if(err) throw err
    })
}

function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    return jsonFiles;
}

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'homework name?'
    },
    {
        type: 'input',
        name: 'outPath',
        message: 'homework path?'
    }
]).then(answers => {
    const tmplDir = join(__dirname, 'templates')
    const destDir = answers.outPath
    const newDestDir = join(process.cwd(),destDir)
    const tmplFileList = getJsonFiles(tmplDir);
    fs_mkdirs(destDir)
    fs.exists(join(newDestDir,'notes'),exists => {
        if(exists){
            // 该文件或目录存在！
            tmplFileList.forEach(file => {
                ejs.renderFile(file,answers,(err,res) => {
                    if(err) throw err
                    const filePath  = file.split('templates/')[1]
                    fs.writeFileSync(join(newDestDir,filePath),res)
                    
                })
            })
        }
        else{
            // 该文件或目录不存在
            fs_mkdirs(destDir)
        }
    });
})