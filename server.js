const { createServer } = require('http');
const next = require('next');

/*
Server for dev only, not required for production.
Added check for NODE_ENV = 'production'
*/

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const handler = app.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log('Running localhost:3000');
    });
});

