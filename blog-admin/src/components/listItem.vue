<template>
 <div>
    <h2 @click='articleDetails(article._id)'>{{article.title}}</h2>
      <div class="wrapper" v-if='showStatus'>
          <span v-if="article.status == 1" class="sign">已发布</span>
          <span v-if="article.status == 0" class="sign draft">未发布</span>
      </div>

    <span class="date">{{article.meta.updateAt}}</span>
</div>
</template>

<script>
export default {
  props: ['article','showStatus'],
  methods:{
    articleDetails: function(id) {
      this.$router.push('/artDetails/' + id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  font-weight: normal;
  display: inline-block;
  cursor: pointer;
  font-size: 0.9rem;
}
.wrapper{
  display: inline-block;
}
li .date{
  float: right;
  font-size: 0.7rem;
}
.sign{
  border: 1px solid #55e3d3;
  padding: 0 0.2rem;
  border-radius: 0.5rem;
  font-size: 0.3rem;
  margin-left: 0.1rem;
  vertical-align: bottom;
  color: rgb(170,170,170);
  background-color: rgba(230,230,230,0.2);
}
.sign.draft{
  border-color: #e39555;
}
</style>
