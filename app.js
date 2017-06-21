var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var path = require('path')//路径模块
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var router = require('./server/router');
var fs = require('fs') //读写文件（异步）



var resolve = file => path.resolve(__dirname, file);

app.use('/dist', express.static(resolve('./blog-admin/dist')));


var static = '/static'
app.use(static, express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost/pfliuBlog')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multiparty);

app.use(session({
    name: 'blogkey',
    secret: 'blogkey',  // 用来对session id相关的cookie进行签名
    store: new mongoStore({
      url: 'mongodb://localhost/pfliuBlog',
      collection: 'sessions',
    }),
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 15 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是15分钟
    }
}));


app.use(router);

// 后台管理页
router.get('/admin', function(req, res) {
  if (req.session.userName) {
    console.log('已登录')
    var html = fs.readFileSync(resolve('./blog-admin/dist/' + 'index.html'), 'utf-8');
  }
  else {
    console.log('未登录')
    var html = fs.readFileSync(resolve('./' + 'login.html'), 'utf-8');
  }
  res.send(html)
});

app.listen(process.env.PORT || 8001, function() {
    console.log("应用实例，访问地址为 localhost:8001")
});