var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Article = require('./articleSchema')
var Label = require('./labelSchema')
var app = express();


mongoose.connect('mongodb://localhost/pfliuBlog')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/admin/article/publish', function(req, res) {
  var id = req.body.article._id/*拿到id从而来判断是否是之前存储过的数据*/
  var articleObj = req.body.article
  var _article
  console.log('1step');

  if (!id) {
    console.log('2step');
    _article = new Article(articleObj)

    _article.save(function(err, article) {
      if (err) {
        console.log(err)/*判断是否有异常*/
      }    
      res.send()
    })
  }
})

// 查询文章列表路由 用于博客后端管理系统包含草稿和已发布文章数据
app.get('/admin/article/list', function(req, res){
    Article.find({}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});


app.listen(process.env.PORT || 8001, function() {
    console.log("应用实例，访问地址为 localhost:8001")
});