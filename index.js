const hapiLambda = require('./modules/hapi-lambda')
const api = require('./api')

hapiLambda.configure([api])
exports.handler = hapiLambda.handler
