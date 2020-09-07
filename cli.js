#! /usr/bin/env node
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

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
    console.log(answers,__dirname);
})