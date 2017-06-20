var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Article = require('./schema/articleSchema')
var Label = require('./schema/labelSchema')
var app = express();
var _ = require('underscore')
//var multiparty = require('connect-multiparty')
var multiparty = require('multiparty')
var util = require('util')
var fs = require('fs') //读写文件（异步）
var path = require('path')//路径模块


var static = '/static'
app.use(static, express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost/pfliuBlog')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multiparty);

app.post('/admin/article/publish', function(req, res) {
  var id = req.body._id/*拿到id从而来判断是否是之前存储过的数据*/
  var articleObj = req.body.article
  var _article
  console.log('1step');

  if (id === 0) {
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
        saveArticle(_article)       
      }
    })
  }
  else {
    Article.findById(id, function(err, article) {
      if (err) {
        console.log(err)
      }
      var num = 0;   //用计数的方法确保所有所有label都被保存
      if (article.label.length > 0) {
          article.label.forEach(function(item, index, array){
           
            Label.findById(item, function(err, currentLabel) {
              let labArticle = currentLabel.article
              labArticle.splice(labArticle.indexOf(id), 1)
              currentLabel.save(function(err, label){
                if(err){
                  console.log(err)
                }
                num++
                if (num == array.length) { //之前所有标签已清除完成
                  articleObj._id = id
                  _article = _.extend(article, articleObj)/*查询得到的movie放第一参数，post过来的放第二参数*/
                  saveArticle(_article)
                }
              })
            })
          })        
      }
      else {
          articleObj._id = id
           _article = _.extend(article, articleObj)/*查询得到的movie放第一参数，post过来的放第二参数*/
           saveArticle(_article)        
      }
                
    })
  }


  function saveArticle(_article) {
    _article.save(function(err, article) {
      if (err) {
        console.log(err)/*判断是否有异常*/
      } 
      var num = 0;   //用计数的方法确保所有所有label都被保存
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
              res.json({message:['草稿保存成功','文章发布成功']})
            }
          })
        })
      })
    })     
  }
})

// 查询文章列表路由 用于博客后端管理系统包含已发布文章数据
app.get('/admin/article/list', function(req, res){
    Article.find({status: 1}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});

// 查询文章列表路由 用于博客后端管理系统包含草稿数据
app.get('/admin/draft/list', function(req, res){
    Article.find({status: 0}, function(err, docs){
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
  Article.find({_id: id})
    .populate('label', 'name') //把label替换成Label模型中的name，labal替换得到的是一个对象，默认包含_id属性
    .exec(function(err, article){
      if (err) {
          console.log('出错'+ err);
          return
      }
      //console.log(article)
      res.send(article[0])
  })
});

//上传照片
app.post('/admin/image/upload', function(req, res) {

  var form = new multiparty.Form();//用于解析上传文件请求的request
  form.parse(req, function(err, fields, files) {
      if(err) {
        console.log(err)
      } 
      console.log(files)  
      //var fields = util.inspect(fields);
      var fileNum = Object.keys(files).length //上传文件个数
      var pathArray = []; //文件上传路径数组
      for (item in files) {
        var currentFile = files[item][0];
        var filePath = currentFile.path;
        //var fileName = currentFile.originalFilename;
        //console.log(1)

        fs.readFile(filePath, (function(current) {//使用闭包
         // console.log(2)
         // var current = currentFile  
          return function(err, data) {
              var timestamp = Date.now()
              var type = current.headers['content-type'].split('/')[1]//png或jpg
              var saveFileName = timestamp + '.' + type //重命名            
              var newPath = path.join(__dirname, 'public/upload/' + saveFileName)
              //生成服务器存储文件的地址
              fs.writeFile(newPath, data, function(err) {

                pathArray.push({path:'http://localhost:8001/static/upload/' + saveFileName ,name: current.originalFilename});
                if (pathArray.length == fileNum) {
                  res.send(pathArray)
                }
              })               
          }
           
        })(currentFile))        
      }
    });
  
})

// 查询标签中文章列表
app.get('/admin/labelDetails/:id', function(req, res){
  var id = req.params.id
  Label.find({_id: id})
    .populate('article', 'title status meta') //把article替换成Article模型中的name，labal替换得到的是一个对象，默认包含_id属性
    .exec(function(err, label){
      //console.log(label);
      if (err) {
          console.log('出错'+ err);
          return
      }
      //console.log(article)
      res.send(label[0])
  })
});

// 删除文章
app.delete('/admin/articleDelete/:id', function(req, res){
  var id = req.params.id
  Article.findById(id, function(err, article) {
      if (err) {
        console.log(err)
      }
      var num = 0;   //用计数的方法确保所有所有label都被保存
      if (article.label.length > 0) {
          article.label.forEach(function(item, index, array){
           
            Label.findById(item, function(err, currentLabel) {
              let labArticle = currentLabel.article
              labArticle.splice(labArticle.indexOf(id), 1)
              currentLabel.save(function(err, label){
                if(err){
                  console.log(err)
                }
                num++
                if (num == array.length) { //之前所有标签已清除完成
                  Article.remove({_id: id}, function(err, article) {
                    if (err) {
                      console.log(err)
                    }
                    else {
                      res.json({success: 1})
                    }
                  })
                }
              })
            }) 
          })        
      }
      else {
          Article.remove({_id: id}, function(err, article) {
              if (err) {
                console.log(err)
              }
              else {
                res.json({success: 1})
              }
            })        
      }
                
    })
});

// 删除标签
app.delete('/admin/labelDelete/:id', function(req, res){
  var id = req.params.id
  Label.findById(id, function(err, label) {
    console.log(label)
      if (err) {
        console.log(err)
      }
      var num = 0;   //用计数的方法确保所有所有label都被保存
      if (label.article.length > 0) {
          label.article.forEach(function(item, index, array){
           
            Article.findById(item, function(err, currentArticle) {
              let artLabel = currentArticle.label
              artLabel.splice(artLabel.indexOf(id), 1)
              currentArticle.save(function(err, label){
                if(err){
                  console.log(err)
                }
                num++
                if (num == array.length) { //之前所有标签已清除完成
                  Label.remove({_id: id}, function(err, label) {
                    console.log(id)
                    if (err) {
                      console.log(err)
                    }
                    else {
                      res.json({success: 1})
                    }
                  })
                }
              })
            })
          }) 
      }
      else {
        Label.remove({_id: id}, function(err, label) {
          console.log(id)
          if (err) {
            console.log(err)
          }
          else {
            res.json({success: 1})
          }
        })        
      }    
    })
});

app.listen(process.env.PORT || 8001, function() {
    console.log("应用实例，访问地址为 localhost:8001")
});