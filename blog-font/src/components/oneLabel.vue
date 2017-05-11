<template>
  <div class="label-container">
    <h2>标签：{{labelName}}</h2>
    <div class="labelBlog">
      <ul>
        <li @click='showDetails' v-for='blog in labelBlogs'>
          <i class="iconfont icon-tag"></i>
          <span>{{blog.title}}</span>
          <span class="right-date">{{blog.date}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script scoped>
export default {
  data () {
    return {
      labelName: this.$route.params.id,
      labelBlogs: [
        {
          title:'React 实现一个轮播组件',
          date:'2017-04-12',
          id:'123456'
        },
         {
          title:'javascript闭包',
          date:'2017-01-12'
        },
         {
          title:'redux 大法好 —— 入门实例 TodoList',
          date:'2016-04-12'
        },
         {
          title:'谈谈 react-router门实例 TodoList',
          date:'2016-11-12'
        },
         {
          title:'React 实现一个轮播组件',
          date:'2017-04-12'
        }
      ]
    }
  },
  methods:{
    showDetails: function() {
      this.$router.push('/details');
    }
  }
}
</script>

<style>
  .label-container h2{
    font-size: 1.5rem;
    color: #868686;    
    text-align: center;
    margin: 20px auto;
  }
  .labelBlog ul{
    margin-bottom: 120px;
  }
  .labelBlog li{
    color: #5d5d5d;
    border-bottom: 1px dashed #d8d8d8;
    padding: 13px 3px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .right-date{
    float: right;
  }
  .labelBlog li:hover{
    border-bottom: 1px solid #b8b8b8;
  }
</style>