<template>
  <header>
      <div class="header-title" @click="markPage">
        <canvas id="myCanvas" width="350" height="100"></canvas>
      </div>
      <nav class="nav">
        <ul>
          <li @click="showHome"><i class="iconfont icon-home"></i> <span>首页</span></li>
          <li @click="showFile"><i class="iconfont icon-guidangxiangmu"></i> <span>存档</span></li>
          <li @click="showLabels"><i class="iconfont icon-biaoqian"></i> <span>标签</span></li>
          <li @click='showDetails'><i class="iconfont icon-gerenkuang"></i> <span>关于</span></li>
        </ul>
      </nav>
    </header>
</template>
<script>
export default {
  mounted: function(){
    let c=document.getElementById("myCanvas");
    let ctx=c.getContext("2d");
    ctx.font="40px Sans-serif";
    ctx.strokeText("Someone's Blog",0,60);
  },
  methods: {
    toPageTop: function() {
      (function slide(){
        let y = document.documentElement.scrollTop||document.body.scrollTop
        if (y > 0){
          setTimeout(slide,20);
          window.scrollTo(0, Math.ceil(y - (y/5)));
        };
      })();       
    },
    showLabels: function() {
        this.$router.push('/labels');
    },
    showHome: function() {
      this.$router.push('/home');
    },
    showFile: function() {
      this.$router.push('/file');
    },
    showDetails: function() {
      this.$router.push('/details');
    },
    markPage: function() {
      this.$router.push('/mark');
    }     
  }
}
</script>

<style>
header {
  width:100%;
  margin: 0 auto;
  border-bottom: 1px solid #d6d6d6;
  padding: 20px 0;
  overflow: hidden;
  display: block;
}
.header-title {
  display: inline-block;
  font-size: 0;
}
.nav{
  float: right;
  height: 100px;
  display: table;
}
.nav ul{
  overflow: hidden;
  vertical-align: middle;
  display: table-cell;
}
.nav ul li{
  float: left;
  margin:0 0.8rem;
  cursor: pointer;
}
.nav span,.nav i:before{
  color: #8c8c89;
  transition: color 0.2s;
}
.nav i:before{
  font-size: 1.2rem;
}
.nav ul li:hover span{
  color:#383838;
}
.nav ul li:hover i:before{
  color:#383838;
}
</style>
