const path = require('path');
const fs = require('fs');
const http = require('http');
const Koa = require('koa');
const app = new Koa();


app.use(async function(ctx, next) {
    console.log(ctx.request.socket.remoteAddress+':'+ctx.request.socket.remotePort)
    
    console.log('raw ip:', ctx.ip)
    console.log(ctx.headers)
    
    ctx.body = 'ok'
});



app.listen(8003);


