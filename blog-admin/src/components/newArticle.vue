<template>
  <div class="article">
    <div class="titleLabel">
      <span>文章标题：</span> <input type="text" id="title" v-model='title'>
    </div>
    <div class="titleLabel label1">
      <p class="chooseContext">标签：</p>
      <p class="chooseLabels">
        <label  v-for='item in labels'><input v-model='checkedLabels' class="label" type="checkbox" :value='item._id'> {{item.name}}</label>
      </p>
    </div>
    <div class="markdownEditor">
        <textarea id="editor"></textarea>
    </div>
    <input class="button" type="submit" value="发布" @click='articlePublish'>
    <div>{{articleContent}}</div> 
    <div>{{checkedLabels}}</div> 
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
      configs: {}    
    } 
  },
  ready() {
    this.initialize();
  },
  created: function(){
    this.$http.get('/admin/labels/list').then(
        respones => {
            this.labels = respones.body
        },
        respone => alert('标签获取失败')
    )           
  },
  mounted() {
    this.initialize();
    this.syncValue();
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
          require(`highlight.js/styles/${theme}.css`);
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
    articlePublish() {
      var self = this
      var obj = {
          title: self.title,
          articleContent: self.articleContent,
          state: 1,
          label: self.checkedLabels
      }
      if (obj.title == '') {
        alert('请输入文章标题')
      } 
      else if (obj.label.length < 1) {
        alert('请选择标签！')
      }
      else{
            this.$http.post('/admin/article/publish', {
                    article: obj
                }).then(
                    response => {
                        alert(response.body.message)
                    },
                    response => alert('文章发布失败')
                )         
      }
               

    }
  },
  destroyed() {
    this.simplemde = null;
  },
  watch: {
    articleContent(val) {
      if (val === this.simplemde.value()) return;
      this.simplemde.value(val);
    },
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
}
.titleLabel{
  line-height: 2.5rem;
  border-bottom: 1px solid #ddd;
  padding-left: 1rem;
  color: #656565;
  font-size: 0.9rem;
  overflow: hidden;
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
  float: right;
  margin-right: 20px;
}
.markdownEditor{
  clear: both;
}
</style>