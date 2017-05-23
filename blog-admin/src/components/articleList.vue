<template>
  <div class="articleList">
    <h1>文章列表</h1>
    <ul>
      <li v-for='article in listDatas'>
        <h2 @click='articleDetails(article._id)'>{{article.title}}</h2>
        <span class="date">{{article.meta.createAt}}</span>
      </li>           
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      listDatas: []
    }
  },
  created: function(){
    let self = this
    this.$http.get('/admin/article/list').then(
      response => {
        self.listDatas = response.body.reverse()
        console.log(self.listDatas)
      },
      respone => console.log(respone)
    )    
  },
  methods:{
    articleDetails: function(id) {
      this.$router.push('/artDetails/' + id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articleList{
  width: 80%;
  margin:30px auto;
  color: #5d5d5d;
}
h1{
  margin: 10px 0;
}
h1, h2 {
  font-weight: normal;
  font-size: 1rem;
}
h2{
  display: inline-block;
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  line-height: 1.5rem;
  border-bottom: 1px dashed #bdbdbd;
  margin-top: 0.5rem;
}
li .date{
  float: right;
  font-size: 0.7rem;
}

a {
  color: #42b983;
}
</style>
