const Koa = require("koa"),
  logger = require("koa-logger"),
  json = require("koa-json"),
  views = require("koa-views"),
  onerror = require("koa-onerror");
const app = new Koa();

//路由
const index = require('./routes/index');
const users = require('./routes/users');

//第三方模块
const path = require("path");
const render = require("koa-art-template");

// error handler
onerror(app);

render(app, {
  root: path.join(__dirname, "views"),
  extname: ".html",
  debug: process.env.NODE_ENV !== "production"
});

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
