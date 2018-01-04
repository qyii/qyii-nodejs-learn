function route(handle, pathname) {
  // console.log('About to route a request for ' + pathname)
  if (pathname.indexOf('favicon') !== -1) {
    return 'icon'
  }
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]()
  } else {
    console.log('404 not found')
    return '404 not found'
  }
}

exports.route = route
