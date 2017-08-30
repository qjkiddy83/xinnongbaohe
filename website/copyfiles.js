 function copyfiles(basePath, targetPath, replace) {
     var fs = require('fs'),
         path = require('path'),
         _basePath = basePath.substr(0, basePath.lastIndexOf('/') + 1),
         _ext = basePath.substr(basePath.lastIndexOf('/') + 1, basePath.length),
         _reg = _ext && _ext !== "**" ? new RegExp(_ext) : null,
         files = fs.readdirSync(path.join(__dirname, _basePath)),
         tmpPath = '';

     targetPath.split('/').forEach(function(item) {
         tmpPath = path.join(tmpPath, item);
         if (!fs.existsSync(tmpPath)) {
             fs.mkdirSync(tmpPath)
         }
     })

     files.forEach(function(item) {
         if (_ext && _ext !== "**" && !_reg.test(item)) {
             return;
         }
         if (replace) {
             fs.readFile(item, 'utf-8', function(err, data) {
                 if (err) {
                     console.log("error");
                 } else {
                     fs.writeFile(targetPath + item, replace(data), function(err) {
                         if (err) throw err;
                     });
                 }
             });
         } else {
             var rd = fs.createReadStream(_basePath + item);
             rd.on("error", function(err) {
                 console.log(err);
             });
             var wr = fs.createWriteStream(targetPath + item);
             wr.on("error", function(err) {
                 console.log(err);
             });
             wr.on("close", function(ex) {

             });
             rd.pipe(wr);
         }
     })
 }
 module.exports = copyfiles;
