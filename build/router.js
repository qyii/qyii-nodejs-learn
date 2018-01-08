function route(handle, pathname, response, postData) {
  // console.log('About to route a request for ' + pathname)
  if (pathname.indexOf('favicon') !== -1) {
    return 'icon'
  }
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, postData)
  } else {
    console.log('404 not found')
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.write('404 Not found')
    response.end()
  }
}

exports.route = route
