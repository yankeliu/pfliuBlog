<template>
  <div class="showFiles">
    <h2>归档</h2>
    <span>(共计5篇文章)</span>
    <div class="timer"> 
      <div class="year" v-for="arrayYear in Object.keys(files)">
          <span class="yearName">{{arrayYear}}</span>
          <article class="content" v-for='item in files[arrayYear]' ><span class="fileDate">{{item.date}}</span><span @click='showDetails' class="articleTitle" >{{item.title}}</span></article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 5,
      files:{
        2017: [
          {date: '2017-04-15',title:'javascript and css',id: '1234567'},
          {date: '2017-04-12',title:'webpack',id: '1234567'},
          {date: '2017-03-12',title:'gulp',id: '1234567'}
        ],        
        2016: [
          {date: '2016-12-12',title:'前端性能优化',id: '1234567'},
          {date: '2016-05-12',title:'前端自动化',id: '1234567'}
        ]
      }
    }
  },
  methods: {
    showDetails: function() {
      this.$router.push('/details');
    }
  }
}
</script>

<style>
.showFiles h2 {
  font-size: 1.5rem;
  color: #868686;
  margin-bottom: 40px;
  display: inline-block; 
}
.showFiles{
    padding: 20px 0;
}
.timer{
  border-left: 6px solid #d6d6d6;
  border-image: -webkit-linear-gradient( #f2f2f2 , #c6c6c6) 10;
}
.year{
  margin-bottom: 20px;
}
.year .yearName{
  display: inline-block;
  font-size: 1.5rem;
  color: #5d5d5d;
  margin: 30px auto;
  margin-left: 40px;
  
}
.year:before{
  content: '';
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #818181;
  margin-left: -10px;
}
.year .content{
  display: block;
}
.year .content:before{
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #818181;
  margin-left: -6.5px;  
}
.year .fileDate{
    font-size: 0.6rem;
    margin-left: 43px;
}
.year .articleTitle{
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.2s;
}
.year article{
  display: block;
  color: #6d6d6d;
  padding: 15px 0;
  border-bottom: 1px dashed #e6e6e6;

}
.year article .articleTitle:hover{
  color: black;
}
</style>