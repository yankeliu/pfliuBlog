<template>
  <div class="articleDetail">
    <h1 v-if='showContent'>{{detail.title}}</h1>
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
        reponse => {
          self.detail = reponse.body
          self.showContent = true
        }, 
        reponse => {
          console.log(response)
        })
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
.markContent{
  width: 80%;
  margin: 20px auto;
}

</style>
