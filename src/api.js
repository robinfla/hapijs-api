exports.plugin = {
  name: 'lambda',
  version: '1.0.0',
  register: function (server, options) {
    server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, h) {
        return 'hello, world'
      }
    })
  }
}
