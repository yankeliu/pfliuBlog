<template>
  <div class="articleList">
    <h1>文章列表</h1>
    <ul>
      <li v-for='article in listDatas'>
        <h2 @click='articleDetails'>{{article.title}}</h2>
        <span class="date">{{article.date}}</span>
      </li>           
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      listDatas: [
        {
          title:'javascript',
          date:'2017-05-01'
        },
        {
          title:'css & javascript',
          date:'2017-05-02'
        },
        {
          title:'html和javascript',
          date:'2017-05-03'
        },
        {
          title:'javasdjkg cript',
          date:'2017-05-04'
        }
      ]
    }
  },
  created: function(){
    this.$http.get('/admin/article/list').then(
      respone => console.log(respone.body.reverse()),
      respone => console.log(respone)
    )    
  },
  methods:{
    articleDetails: function() {
      this.$router.push('/artDetails');
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
