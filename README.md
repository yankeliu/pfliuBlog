# pfliu-blog搭建个人博客

> 使用vue2.0全家桶搭建前台页面，后台页面使用node，结合express框架和数据库mongodb完成。

## 功能介绍

- 实现发布文章、草稿存储功能
- 可以根据标签来搜索文章，一篇文章支持多个标签，能够对标签进行添加和删除操作
- 可以对文章进行编辑、删除操作
- 编辑文章可以直接拖拽本地图片将图片上传
- 手机端样式自适应--当浏览器宽度小于768px时改变样式

## 技术难点
- 博客的编辑实现了markdown语法编辑，该功能通过引入`simplemde`模块实现，同时博客展示通过引入`marked`模块和`highlight.js`模块实现`markdown`解析和高亮
- 拖拽图片到编辑框可以直接上传图片，支持同时上传多个图片。该功能通过监听DOM元素的`drop`事件，并将拖拽的图片数据发送给后台，后台通过`multiparty`模块解析上传文件并存储在服务器端
- 登录验证。通过引入`express-session`模块和`connect-mongo`模块，当用户输入正确的用户名和密码时，将会话信息存储在数据库并给前台发送对应的`sessionID`值

## 项目目录介绍
- `blog-admin`文件夹对应后台页面代码，使用`vue-cli`
- `blog-font`文件夹对应前台页面代码，使用`vue-cli`
- `public`文件夹存储上传文件
- `server`文件夹中包含数据模型`model`和后端路由代码以及用户信息
- `preview`存放后台页面展示图片

## 运行

- `$ npm install  #安装依赖`
- `$ net start mongo  #启动数据库`
- `$ gulp  #运行服务器` 
- 浏览器地址栏输入`http://localhost:8001/admin`
- 登录用户名：ffl;   密码： 123

后台页面展示：

![后台页面展示](https://github.com/yankeliu/pfliuBlog/blob/master/preview/%E5%90%8E%E5%8F%B0%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.gif)

图片上传展示：

![图片上传展示](https://github.com/yankeliu/pfliuBlog/blob/master/preview/upload.gif)
