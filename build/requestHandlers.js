var exec = require('child_process').exec

function start(response) {
  console.log("Request handler 'start' was called.")

  setTimeout(() => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.write('hello stdout')
    response.end()
  }, 2000)
}

function upload(response) {
  console.log("Request handler 'upload' was called.")
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.write('Hello Upload')
  response.end()
}

exports.start = start
exports.upload = upload
