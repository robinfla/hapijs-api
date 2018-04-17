const hapiLambda = require('./modules/hapi-lambda')
const api = require('./src/api')

hapiLambda.configure([api])
exports.handler = hapiLambda.handler
