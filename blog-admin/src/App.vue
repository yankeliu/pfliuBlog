<template>
  <div id="app">
    <div class="navBar">
      <h1 class="title"><span><i class="iconfont icon-write"></i> 博客后台 </span><div class="menu"><i @click='showNav' class="iconfont icon-caidan"></i></div></h1>
      <ul class="nav_mobile" v-if='show_nav'>
        <li :class="{ active: current == 0 }" @click="articleList">
          <span style="border-right: 1px #ddd solid"><i class="iconfont icon-liebiao"></i> 文章列表</span>
            
        </li>
        <li :class="{ active: current == 1 }" @click="draftList">
        <span><i class="iconfont icon-guidangxiangmu"></i> 草稿箱&nbsp;&nbsp;&nbsp;&nbsp;</span>
            
        </li>
        <li :class="{ active: current == 2 }" @click="showLabels">
        <span style="border-right: 1px #ddd solid"><i class="iconfont icon-biaoqian"></i> 标签管理</span>
            
        </li>
        <li :class="{ active: current == 3 }" @click="newArticle">
        <span><i class="iconfont icon-xinjianwendang"></i> 新建文章</span>
            
        </li>
      </ul>      

      <ul class="nav_left">
        <li :class="{ active: current == 0 }" @click="articleList">
            <i class="iconfont icon-liebiao"></i> 文章列表
        </li>
        <li :class="{ active: current == 1 }" @click="draftList">
            <i class="iconfont icon-guidangxiangmu"></i> 草稿箱&nbsp;&nbsp;&nbsp;&nbsp;
        </li>
        <li :class="{ active: current == 2 }" @click="showLabels">
            <i class="iconfont icon-biaoqian"></i> 标签管理
        </li>
        <li :class="{ active: current == 3 }" @click="newArticle">
            <i class="iconfont icon-xinjianwendang"></i> 新建文章
        </li>
      </ul>
    </div>
    <div class="content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      current:0,
      nameArray: ['articleList','draftList','labelsList','newArticle'],
      show_nav: false
    } 
  },
  created: function(){
    console.log(this.$router)
    this.current = this.nameArray.indexOf(this.$router.history.current.name);
    //用于刷新页面时使current指向当前路由
  },  
  methods: {
    newArticle: function() {
      this.$router.push('/newArticle'); 
    },
    articleList: function() {

      this.$router.push('/');
    },
    showLabels: function() {
      this.$router.push('/labelsList');
    },
    draftList: function() {
      this.$router.push('/draftList');      
    },
    showNav: function() {
      this.show_nav = !this.show_nav;
    }
  },
  watch: {
    $route (val, oldval) {
      switch(val.name) {
        case 'newArticle':
          if(!val.query.id) {
            this.current = 3;
          }
          break;
        case 'labelsList':
          this.current = 2;
          break;
        case 'draftList' :
          this.current = 1;
          break;
        case 'artDetails' :
          this.current = -1;
          break;
        case 'articleList':
          this.current = 0;
          break;       
        default:
          this.current = -1;
      }
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.navBar {
  text-align: center;
  width: 17%;
  height: 100vh;
  background-color: #2a2935;
  color: #999;
  /*position: fixed;*/
  float:left;
}
.navBar .title{
  font-weight: normal;
  font-size: 1rem;
  color: #32d3c3;
  background-color: #1e1d26;
  line-height: 2.5rem;
}
.navBar .nav_left{
  line-height: 2rem;
  margin-top: 20px;
  cursor: pointer;
}
.nav_left li{
    transition: all 0.2s;
}
.nav_left li:hover{
  background-color: #26252f;
  color: #32d3c3;

}
.content{
  width: 83%;
  float: right;
  height: 100vh;
  transition: all 0.2s;
  overflow-y: scroll;
}
.nav_left .active{
  background-color: #26252f;
  color: #32d3c3;
}
.nav_mobile{
  display: none;
}
.nav_mobile .active{
  color: #32d3c3;
}
.menu{
  float: right;
  display: none;
}
@media screen and (max-width: 768px) {
  .nav_left{
    display: none;
  }
  .navBar{
    width: 100%;
    height: auto;
    position: relative;
  }
  .menu{
    display: inline-block;
  }
  .caidan{
    vertical-align: baseline;
  }
  .navBar .title{
    text-align: left;
    padding: 0 15px;
  }
  .content{
    width: 100%;
  }
  .nav_mobile li{
    float: left;
    width: 50%;
    box-sizing: border-box;
    border-bottom: 1px #ddd solid;
    padding: 1vh 0;
    font-size: 0.8rem;
  }
  .nav_mobile li span{
    display: block; 
  }
  .nav_mobile{
    display: block;
  }
} 
</style>
