const Koa = require("koa");
const app = new Koa();
const config = require('./config/development.json');
const authRouter = require('./api/routers/auth-router')
const mongoConnect = require('./libs/mongo-connection');
const koaBody = require('koa-body');
const jwt = require('./libs/jwt')
const cors = require('@koa/cors');

mongoConnect(config);

app
app
    .use(cors())
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = { error: err.message || err }
            ctx.app.emit('error', err, ctx);
        }
    })
    .use(koaBody())

    .use(jwt.unless({ path: [/^\/auth/] }))

    .use(authRouter.middleware())

app.on('error', (err, ctx) => {
    console.error('server error', err.message);
    console.error(err);
});


app.listen(config.port);