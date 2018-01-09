const queryString = require('querystring')
const fs = require('fs')
const formidable = require('formidable')

function start(response, postData) {
  console.log("Request handler 'start' was called.")

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>'

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(body)
    response.end()
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.")
  var form = new formidable.IncomingForm()
  console.log('about to parse')
  // form.uploadDir = './Static' // 设置上传的路径
  form.parse(request, function(error, fields, files) {
    console.log('parsing done' + files.upload.path)
    // fs.renameSync(files.upload.path, './tmp/test.jpg')

    // 解决跨分区操作的权限问题报错 cross-device link not permitted 采用filestream的形式
    var readStream = fs.createReadStream(files.upload.path)
    // 查看文件夹是否存在 不存在则创建
    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp')
    }
    var writeStream = fs.createWriteStream('./tmp/test.jpg')
    readStream.pipe(writeStream)
    readStream.on('end', function() {
      fs.unlinkSync(files.upload.path)
    })
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('received image:<br/>')
    response.write("<img src='/show' />")
    response.end()
  })
}

function show(response, postData) {
  console.log("Request handler 'show' was called.")
  fs.readFile('./tmp/test.jpg', 'binary', function(error, file) {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      response.write(error + '\n')
      response.end()
    } else {
      response.writeHead(200, { 'Content-Type': 'image/png' })
      response.write(file, 'binary')
      response.end()
    }
  })
}

exports.start = start
exports.upload = upload
exports.show = show
