function route(handle, pathname) {
  // console.log('About to route a request for ' + pathname)
  if (pathname.indexOf('favicon') !== -1) {
    return
  }
  if (typeof handle[pathname] === 'function') {
    handle[pathname]()
  } else {
    console.log('404 not found')
  }
}

exports.route = route
