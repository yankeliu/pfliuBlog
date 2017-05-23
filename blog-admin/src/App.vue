<template>
  <div id="app">
    <div class="navBar">
      <h1 class="title">博客后台</h1>
      <ul>
        <li @click="articleList">文章列表</li>
        <li>草稿箱</li>
        <li @click="showLabels">标签管理</li>
        <li @click="newArticle">新建文章</li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    newArticle: function() {
      this.$router.push('/newArticle');
    },
    articleList: function() {
      this.$router.push('/');
    },
    showLabels: function() {
      this.$router.push('/labelsList');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.navBar {
  text-align: center;
  width: 17%;
  height: 100vh;
  background-color: #2a2935;
  color: #999;
  position: fixed;
}
.navBar .title{
  font-weight: normal;
  font-size: 1rem;
  line-height: 2.5rem;
  color: #32d3c3;
  background-color: #1e1d26;
}
.navBar ul{
  line-height: 2rem;
  margin-top: 20px;
  cursor: pointer;
}
.navBar li:hover{
  background-color: #26252f;
  color: #32d3c3;
}
.content{
  width: 83%;
  float: right;
  height: 100vh;
}
</style>
