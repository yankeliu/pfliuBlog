<template>
  <div class="articleDetail">
    <h1>javascript</h1>
    <div class="markContent" v-compiledMarkdown>{{content}}</div>
  </div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js'
import '../assets/css/atom-one-light.css'
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
    this.fetchData();  
  },  
  beforeMount: function(){
    marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        });
    },
  mounted: function(){
    console.log('mounte');
  },
  methods:{
    fetchData: function() {
      this.content='# 标题\n## 标题2\n### 标题3\n```\n<html></html>\n// 以 jQuery 的 ajax 为例 \n $.get(\'/get_url\', function(result, status) {\n  if(status == \'success\') {\n  var s=5;\n  alert(\'success\');\n  }\nif(status == \'error\') {\n    alert(\'error\');\n  }\n});\n```\n的和v分块v函数的，是肯定会覅偶对收购覅读后感掉，四的姑父if公司饿哦i，是个大幅我给粉丝而非hi福和v发快递幸福和\n\nvin三等分hi小和v粉丝哦阿富汗与第四幅\n![](http://sajfg)';
    }
  },
  watch: {
        '$route': 'fetchData'
  },  
  directives: {
        compiledMarkdown: {
            bind: function(el){
                el.innerHTML = marked(el.innerText);
            }
        }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  margin: 20px 0;
  text-align: center;
  font-size: 2rem;
  color: #626262;
}
.markContent{
  width: 80%;
  margin: 20px auto;
}

</style>
