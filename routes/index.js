var router = require('koa-router')();

router.get("/", (ctx, next) => {
  ctx.render("index");
});

module.exports = router;
