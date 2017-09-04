#!/usr/bin/env node

let {spawn,exec} = require('child_process');

process.env.WEBROOT = process.argv.pop();

exec('rm -rf ./'+process.env.WEBROOT+'/dist');

var free = exec('npm run ant');

free.stdout.on('data', function(data) {
    console.log(data.toString());
});
free.stderr.on('data', function(data) {
    console.error(data.toString());
});
free.on('exit', function(code, signal) {
    console.log(code.toString());
});