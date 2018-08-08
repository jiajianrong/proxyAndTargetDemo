const path = require('path');
const fs = require('fs');
const http = require('http');
const Koa = require('koa');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const app = new Koa();


const makeProxy = function(ctx) {
    return new Promise((resolve, reject) => {
        
        ctx.res.on('finish', ()=> resolve())
        
        proxy.web(ctx.req, ctx.res, {
            target: 'http://finsys2.x.cn/',
            headers: {
                ip: '',
                host: '',
                origin: '',
                'x-origin-ip': ctx.headers['x-forwarded-for'],
            }
        }, e => reject(e));

    })
}


app.use(async function(ctx, next) {
    console.log(ctx.request.socket.remoteAddress+':'+ctx.request.socket.remotePort)
    
    console.log('raw ip:', ctx.ip)
    console.log(ctx.headers)
    
    console.log('==========start')
    await makeProxy(ctx)
    console.log('==========done')
});



app.listen(8003);


