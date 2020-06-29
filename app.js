var Koa = require('koa')
var app = new Koa()

var bodyparser = require('koa-bodyparser')
app.use(bodyparser())

var control = require('./control')
app.use(control())


app.listen(8080)