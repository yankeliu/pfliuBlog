<template>
  <main>
    <div class="main_content">
        <ul>
          <li v-for="blog in blogs">
              <h2><span @click='showDetails'>{{blog.title}}</span></h2>
              <div class="date_labels"> 
                <p class="date"><i class="iconfont icon-riqi"></i> <span>{{blog.date}}</span></p>
                <p class="labels"><i class="iconfont icon-tag"></i><span v-for="item in blog.labels">{{item}}</span></p>
              </div>
              <div class="summary" @click='showDetails'>{{blog.summary}}</div>
          </li>
        </ul>
    </div>
    <div class="show-page">
      <div class="prev-page">上一页</div>
      <div>1 / 3</div>
      <div class="next-page">下一页</div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      labels: ['all','JavaScript','css','html','工具','nodeJS'],
      blogs:[
        {
          title: 'Webpack最佳实践',
          date: '2016-12-15',
          summary: '原文 What’s new in webpack 2webpack 2 中的新特性创造永无止境，现在 webpack 2 的版本已经更新到了 2.0.5-beta+ 。主要的变化ES6 Moduleswebpack 2 已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。import & ',
          labels: ['all','JavaScript','css','html','工具','nodeJS'],
          id: '123456789'
        },
        {
          title: 'Webpack最佳实践',
          date: '2016-12-15',
          summary: '原文 What’s new in webpack 2webpack 2 中的新特性创造永无止境，现在 webpack 2 的版本已经更新到了 2.0原文 What’s new in webpack 2webpack 2 中的新特性创造永无止境，现在 webpack 2 的版本已经更新到了 2.0.5-beta+ 。主要的变化ES6 Moduleswebpack 2 已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。impor.5-beta+ 。主要的变化ES6 Moduleswebpack 2 已经支持原生的 ES6 的模块加载器原文 What’s new in webpack 2webpack 2 中的新特性创造永无止境，现在 webpack 2 的版本已经更新到了 2.0.5-beta+ 。主要的变化ES6 Moduleswebpack 2 已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。impor了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。import & ...',
          labels: ['all','JavaScript','css','html','工具','nodeJS'],
          id: '123456789'
        }, 
        {
          title: 'Webpack最佳实践',
          date: '2016-12-15',
          summary: '原文 What’s new in webpack 2webpack 2 中的新特性创造永无止境，现在 webpack 2 的版本已经更新到了 2.0.5-beta+ 。主要的变化ES6 Moduleswebpack 2 已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。import & ',
          labels: ['all','JavaScript','css','html','工具','nodeJS'],
          id: '123456789'
        }             
      ]
    }
  },
  methods: {
    showDetails: function() {
      this.$router.push('/details');
    }
  }    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main{
  width: 100%;
}
.main_content li{
  padding: 45px 0;
  border-bottom: 1px dashed #e6e6e6;
}
.main_content h2 span{
  font-size: 1.5rem;
  color: #676767;
  cursor: pointer;
  transition: color 0.2s;
}
.date_labels{
  padding:15px 0;
}
.date_labels p{
  display: inline-block;
}
.date span,.labels span{
  font-size: 0.9rem; 
  color: #9b9b99;
}
.labels{
  float:right;
}
.labels span{
    display: inline-block;
    margin-left: 0.5rem
}
.summary{
  clear: right;
  text-align:justify;
  color: #5d5d5d;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1.5rem;
}
.main_content h2 span:hover,.summary:hover{
  color: #383838;
}
.icon-riqi{
  font-size: 1.1rem; 
  color: #9b9b99;
}
.icon-tag{
  color: #9b9b99;
}
.show-page{
  display: flex;
  justify-content: space-between;
  padding: 50px 10px;
  color: #5d5d5d;
}
.prev-page:before,.next-page:after{
  content: '';
  display: inline-block;
  border-top:1px solid #5d5d5d;
  border-left:1px solid #5d5d5d;
  width: 0.6rem;
  height: 0.6rem; 
}
.prev-page:before{
  transform: rotate(-45deg);
}
.next-page:after{
  transform: rotate(-225deg);
}
.prev-page,.next-page{
  cursor: pointer;
}
</style>
