<template>
  <div class="showLabels">
  <h2>标签</h2>
    <span v-for='item in labels' @click="showLabelBlogs(item)">{{item}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labels: ['all','JavaScript','css','html','工具','nodeJS']
    }
  },
  methods: {
    showLabelBlogs: function( label ) {
      this.$router.push({path:'/oneLabel/' + label});
    }
  }
}
</script>

<style>
.showLabels{
  height: 500px;
  color: #8c8c89;
  padding: 20px 5px;
}
.showLabels h2 {
  font-size: 1.5rem;
  color: #868686;
  margin-bottom: 20px;
  margin-left: -5px;
}
.showLabels span{
  border: 1px solid #8c8c89;
  padding: 0.4rem 0.8rem;
  margin: 10px 0;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
}
.showLabels span:hover{
  color: #383838;
  background-color: #f5f5f5;
}
</style>