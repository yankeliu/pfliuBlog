<template>
  <div class="articleList">
    <h1>草稿列表</h1>
    <ul>
      <li v-for='article in listDatas'>
        <list-item :article='article'  :showStatus = 'false'></list-item>
      </li>           
    </ul>
  </div>
</template>

<script>
import listItem from'./listItem'
export default {
  name: 'hello',
  data () {
    return {
      listDatas: []
    }
  },
  components: {
    'list-item': listItem
  },
  created: function(){
    let self = this
    this.$http.get('/admin/draft/list').then(
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
  font-size: 1.2rem;
  color: #8c8c89;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
}
li {
  line-height: 1.5rem;
  border-bottom: 1px dashed #bdbdbd;
  margin-top: 0.5rem;
}
a {
  color: #42b983;
}
</style>
