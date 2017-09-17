/**
 * 静态服务器（canvas部分操作对域敏感，这里使用静态服务器解决）
 *
 * @author wujohns
 * @date 17/9/12
 */
'use strict';

const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

app.use(express.static(path.join(__dirname, './')));

const server = http.createServer(app);
server.on('listening', () => {
    console.log(`listening: ${ port }`);
});
server.listen(port);