<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <footer>
      <p>© 2017 liupengfei</p>
    </footer>
    <div id="toTop" @click='toPageTop'>
      <i class="iconfont icon-huidaodingbu"></i>
    </div>
  </div>
</template>

<script>
import vHeader from './components/header.vue'
export default {
  name: 'app',
  components: {
    'vHeader': vHeader
  },
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
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
}
footer{
  display: block;
  border-top: 1px solid #d6d6d6;
}
footer p{
  text-align: center;
  font-size: 0.6rem;
  margin-top: 20px;
}
#toTop{
  position: fixed;
  right: 10rem;
  bottom: 3rem;
}
.icon-huidaodingbu{
  font-size: 2.6rem;
  color: #b8b8b9;
  cursor: pointer;
  transition: color 0.2s;
}
.icon-huidaodingbu:hover{
  color: #989898;
}
</style>
