<template>
  <div class="articleDetail">
    <div class="header">
      <h1>{{detail.title}}</h1>
      <p v-if='showContent' class="date">
        {{detail.meta.updateAt}}
        <label><i class="iconfont icon-tag"></i><span class="label" v-for="item in detail.label">{{item.name}}</span></label>
        <span v-if="detail.status == 1" class="sign">已发布</span>
        <span v-if="detail.status == 0" class="sign">未发布</span>
      </p>
      <div class="head_right">
        <button class="redact" @click='redactArticle'>编辑</button>
        <button class="delete" @click='deleteArticle'>删除</button>
      </div>
    </div>
    <div v-if='showContent' class="markContent" v-compiledMarkdown>{{detail.articleContent}}</div>
  </div>
</template>

<script>
import marked from 'marked';
import highlight from 'highlight.js'
import '../assets/css/atom-one-light.css'
export default {
  
  data () {
    return {
      detail: {},
      showContent: false
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
      let url = '/article/' + this.$route.params.index
      let self = this
      this.$http.get(url).then( 
        response => {
          self.detail = response.body
          if (self.detail.label.length < 1){
            self.detail.label = [{name:'无标签'}]
          }
          self.showContent = true
          console.log(response)
        }, 
        response => {
          console.log(response)
        })
    },
    redactArticle: function() {
      this.$router.push('/newArticle/?id=' + this.$route.params.index)
    },
    deleteArticle: function() {
      if (confirm('确定删除该文章？')){
        let url = '/admin/articleDelete/' + this.$route.params.index
        console.log(url)
        let self =this
        this.$http.delete(url).then(
          response => {
            if(response.body.success){
              self.$router.go(-1)
            }
          },
          response => {
            console.log(response)
          })
      }
    }
  },
  watch: {
        '$route': 'fetchData'
  },  
  directives: {
        compiledMarkdown: {
            bind: function(el, binding, vnode){
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
.articleDetail{
    width: 80%;
    margin: 20px auto;
}
.date{
  font-size: 0.7rem;
  text-align: center;
  color: #959595;
  line-height: 1.5rem;
}
.header{
  position: relative;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f1f1;
}
.head_right{
  position: absolute;
  right: 0;
  bottom: 1.3rem;
}
.redact, .delete{
  font-size: 0.6rem;
  padding: 0 0.8rem;
  height: 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;
  transition:  all 0.2s;
}
.redact:hover, .delete:hover{
  background-color: rgba(50,211,195,0.1);
}
.redact{
  border-color: rgb(100,200,100);
}
.delete{
  border-color:#e39555;
}
.sign{
  border: 1px solid #55e3d3;
  padding: 0.1rem 0.4rem;
  border-radius: 0.5rem;
  font-size: 0.5rem;
  margin-left: 0.5rem;
  vertical-align: bottom;
}
label{
  margin-left: 0.2rem;
}
.label{
  margin:0 0.2rem;
}
@media screen and (max-width: 768px){
  .head_right{
    position: inherit;
    bottom: 0;
    text-align: center;
  }
}
</style>
