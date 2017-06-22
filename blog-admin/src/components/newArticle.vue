<template>
  <div class="article" >
    <div class="titleLabel">
      <span>文章标题：</span> <input type="text" id="title" v-model='title'>
    </div>
    <div class="titleLabel label1">
      <p class="chooseContext">标签：</p>
      <p class="chooseLabels">
        <label  v-for='item in labels'><input v-model='checkedLabels' class="label" type="checkbox" :value='item._id'> {{item.name}}</label>
      </p>
    </div>
    <div class="markdownEditor" :class="{droppingImg: showDrag}" @drop.prevent = uploadImg($event) @dragenter.prevent = uploadImg($event) @dragover.prevent = uploadImg($event)>
        <textarea id="editor"></textarea>
    </div>
    <div class="publish">
      <input class="button" type="submit" value="保存草稿" @click='articlePublish(0)'>
      <input class="button" type="submit" value="发布文章" @click='articlePublish(1)'>
    </div>
    <!-- <div>{{articleContent}}</div> 
    <div>{{checkedLabels}}</div>  -->
    <!-- <button @click='showImg($event)'>点击添加图片</button> -->

  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import '../assets/css/simplemde.min.css';
import '../assets/css/atom-one-light.css';
export default {
  name: 'markdown-editor',
  data () {
    return {
      checkedLabels:[],
      labels:[],
      title:'',
      articleContent: '',
      previewClass: '',
      configs: {},
      id: 0,
      showDrag: false
    } 
  },
  ready() {
    this.initialize();
  },
  created: function(){
    console.log('test');
    this.$http.get('/admin/labels/list').then(
        respones => {
            this.labels = respones.body
        },
        respones => alert('标签获取失败')
    );


    let id = this.$route.query.id;
    if (id) {
      this.id = id
      let url = '/article/' +id
      this.$http.get(url).then(
        respones => {
            this.checkedLabels = respones.body.label.map(function(item) {
              return item._id
            })
            this.title = respones.body.title
            this.articleContent = respones.body.articleContent
        },
        respones => alert('文章数据读取失败')
      );      
    }

  },
  mounted() {
    this.initialize();
    this.syncValue();
  },
  distroyed: function(){
      this.checkedLabels = [];
      this.title = '';
      this.articleContent = '';
  },
  methods: {
    initialize() {
      let configs = {};
      Object.assign(configs, this.configs);
      configs.element = document.getElementById('editor');
      configs.initialValue = configs.initialValue || this.articleContent;
      // 实例化编辑器
      this.simplemde = new SimpleMDE(configs);
      // 判断是否开启代码高亮
      if (configs.renderingConfig && configs.renderingConfig.codeSyntaxHighlighting) {
        require.ensure([], () => {
          const theme = configs.renderingConfig.highlightingTheme || 'default';
          window.hljs = require('highlight.js');
          //require(`highlight.js/styles/${theme}.css`);
        }, 'highlight');
      }
      // 添加自定义 previewClass
      const className = this.previewClass || '';
      this.addPreviewClass(className);
      // 绑定事件
      this.bindingEvents();
    },
    bindingEvents() {
      this.simplemde.codemirror.on('change', () => {
        this.$emit('input', this.simplemde.value());
      });
    },
    addPreviewClass(className) {
      const wrapper = this.simplemde.codemirror.getWrapperElement();
      const preview = document.createElement('div');
      wrapper.nextSibling.className += ` ${className}`;
      preview.className = `editor-preview ${className}`;
      wrapper.appendChild(preview);
    },
    syncValue() {
      this.simplemde.codemirror.on('change', () => {
        this.articleContent = this.simplemde.value();
      });
    },
    articlePublish(status) {
      var self = this
      var obj = {
          title: self.title,
          articleContent: self.articleContent,
          status: status,
          label: self.checkedLabels
      }
      console.log(obj._id)
      if (obj.title == '') {
        alert('请输入文章标题')
      } 
      else if (obj.label.length < 1) {
        alert('请选择标签！')
      }
      else if (self.simplemde.value() == '') {
        alert('文章内容不能为空')
      }
      else{
            self.$http.post('/admin/article/publish', {
                    article: obj,
                    _id: self.id
                }).then(
                    response => {
                      let message = response.body.message
                      if (message instanceof Array) {
                        alert(message[status])
                        self.title = ''
                        self.checkedLabels = []
                        self.simplemde.value('')                      
                      }
                      else {
                        alert(message);
                      }
                       
                    },
                    response => alert('操作失败')
                )         
      }
               

    },
    uploadImg(event) {
      let type = event.type
      switch (type) {
        case 'dragenter':
        case 'dragover':
          this.showDrag = true
          break
        case 'drop':
          this.showDrag = false
          break 
        default:
          this.showDrag = false         
      } 
      if (type == 'drop' && event.target.className == 'CodeMirror-scroll') {
          let data = new FormData();
          let files = event.dataTransfer.files;

          let i = 0;
          let len = files.length;
      
          while (i < len){
            if (files[i].type.split('/')[0] !== 'image') {
              alert('请拖拽图片')
              return
            };
              data.append("file" + i, files[i]);
              i++;
          }
          let self = this
          this.$http.post('/admin/image/upload', data/*, {'Content-Type': 'multipart/form-data'}*/).then( response => {
            response.body.forEach(function(item) {
              self.articleContent += '\n\n![' + item.name +'](' + item.path  + ')\n\n'
            }) 
            console.log(response.body)
          })        
      } 
    }/*,
    showImg(ev) {
      var img = new Image();
      img.src = '../../public/upload/000.jpeg';
      ev.target.parentNode.appendChild(img);
      console.log(ev.target.parentNode.innerHTML)
    }*/
  },
  destroyed() {
    this.simplemde = null;
  },
  watch: {
    articleContent(val) {
      if (val === this.simplemde.value()) return;
      this.simplemde.value(val);
    },
    $route (val, oldval) {
      console.log(val);
      console.log(oldval);
      if (val.path == '/newArticle') {
          this.title = '';
          this.checkedLabels = [];
          this.simplemde.value('');        
      }
    }
  },
};
</script>

<style scoped>
.article{

}
#title{
  height: 1.2rem;
  font-size: 0.9rem;
  border:none;
  outline: none;
  vertical-align: middle;
  width: 40%;
  font-weight: bold;
  margin-left: 1rem;
  border-bottom: 1px solid rgb(220,220,220);
  padding-bottom: 0.2rem;
}
.titleLabel{
  line-height: 2.5rem;
  border-bottom: 1px solid #ddd;
  padding-left: 1rem;
  color: #656565;
  font-size: 0.9rem;
  overflow: hidden;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.titleLabel.label1{
  padding-left: 4rem;
}
.titleLabel label{
  margin-left: 1rem;
  display: inline-block;
}
.titleLabel .label{
  width: 0.9rem;
  height: 0.9rem;
  vertical-align: middle;
}
.article .chooseContext{
  width: 3rem;
  float: left;
  margin-left: -3rem;
}
.article .chooseLabels{
  float: left;
  width: 100%;
}
.article .editor-toolbar{
  border:none;
  border-radius: none;
}
.article .CodeMirror{
  border:none;
}
.button{
  margin-right: 1rem;
  font-size: 0.8rem;
  background-color: rgba(90,260,230,0.5);
  border-style: none;
  height: 1.5rem;
  padding: 0 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;
  border: 1px #8c8c89 solid;
  outline: none;
}
.markdownEditor{
  clear: both;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}
.publish{
  float: right;
  overflow: hidden;
  margin: 1rem;
}
.button:hover{
  background-color:  rgba(50,211,195,0.5)
}
.droppingImg .CodeMirror.cm-s-paper.CodeMirror-wrap{
  border: 1px red solid;
}
</style>