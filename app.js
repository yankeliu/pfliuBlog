var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Article = require('./schema/articleSchema')
var Label = require('./schema/labelSchema')
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
    _article = new Article(articleObj)

    Article.find({title: articleObj.title}, function(err, article) {
      if(err) {
        console.log(err)
      }
      if(article.length > 0) {
        console.log(article.length)
        res.json({message:'已存在相同文章标题'})
      }
      else{
        _article.save(function(err, article) {
          if (err) {
            console.log(err)/*判断是否有异常*/
          } 
          var num = 0;   
          article.label.forEach(function(item, index, array){
            //console.log(index+'1')
            Label.findById(item, function(err, currentLabel) {
              //console.log( Label.findOne({_id: item}))
              //console.log(index + '2')
              currentLabel.article.push(article._id)
              currentLabel.save(function(err, label){
                if(err){
                  console.log(err)
                }
                num++
                //console.log(index+'3')
                if (num == array.length) {
                  res.json({message:'文章发布成功'})
                }
              })
            })
          })
        })        
      }
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

//添加新标签路由
app.post('/admin/labels/new', function(req, res) {
  var labelName = req.body.newLabelName
  var _label = new Label({
          name: labelName
        })
    _label.save(function(err, label) {
      if (err) {
        console.log(err)/*判断是否有异常*/
      }   
      res.send()
    })
})

// 查询标签列表
app.get('/admin/labels/list', function(req, res){
    Label.find({}, function(err, labels){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(labels)
    })
});


// 查询文章详情
app.get('/article/:id', function(req, res){
  var id = req.params.id
  Article.findById(id, function(err, article){
      if (err) {
          console.log('出错'+ err);
          return
      }
      console.log(article)
      res.send(article)
  })
});

app.listen(process.env.PORT || 8001, function() {
    console.log("应用实例，访问地址为 localhost:8001")
});