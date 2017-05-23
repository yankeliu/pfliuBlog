<template>
  <div class="showLabels">
  <h2>标签</h2>
  <div  class="labelList">
    <label v-for='item in labels' @click="showLabelBlogs(item)"><span>{{item.name}}</span>(<span>{{item.article.length}}</span>)</label>
  </div>
    
    <p class="newLabel" >
      <input placeholder="请输入标签名" type="text" v-model='newLabelName'>
      <button @click=newLabel>添加新标签</button>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labels: [],
      newLabelName: ''
    }
  },
  created: function(){
    this.$http.get('/admin/labels/list').then(
        respones => {
            this.labels = respones.body
        },
        respone => alert('标签获取失败')
    )       
  },
  methods: {
    showLabelBlogs: function( label ) {
      this.$router.push({path:'/oneLabel/' + label});
    },
    newLabel() {
      let self = this
      let sameName = this.labels.some(function(item, index, array){
        return (item.name == self.newLabelName)
      })
      if (sameName) {
        alert('标签已存在，请勿重复添加！')
        self.newLabelName=''; 
      } 
      else{
        this.$http.post('/admin/labels/new', {
            newLabelName: self.newLabelName
        }).then(
            respone => {
                self.labels.push({name:self.newLabelName,article:[]})
                self.newLabelName=''; 
            },
            respone => {
              alert('标签添加失败');
              self.newLabelName=''; 
            }
        )   
      }

    }   
  }
}
</script>

<style>
.showLabels{
  color: #8c8c89;
  padding: 20px 30px;
  width: 100%;
  overflow: hidden;
}
.showLabels h2 {
  font-size: 1rem;
  font-weight: normal;
  color: #868686;
}
.labelList{
  border-top: 1px dashed #c6c6c6;
  border-bottom: 1px dashed #c6c6c6;
  margin:20px 0;
  padding: 10px 0;
}
.showLabels label{
  border: 1px solid #8c8c89;
  line-height: 1rem;
  padding: 0.3rem 0.6rem;
  margin: 10px auto;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 0.9rem;
  display: inline-block;
}
.showLabels label:hover{
  color: #383838;
  background-color: #f5f5f5;
}
.newLabel{
  color: rgb(50,50,50);
}
.newLabel input,button{
  outline: none;
  font-size: 0.8rem;
  height: 1.5rem;
  vertical-align: middle;
  border-radius: 0.2rem;
  border: 1px #8c8c89 solid;
  background: none;
  padding: 0 0.3rem;
}
.newLabel input::-webkit-input-placeholder{
  color: #999999;
}
.newLabel button{
  cursor: pointer;
  transition: all 0.2s;
  background-color: rgba(90,260,230,0.5)
}
.newLabel button:hover{
  background-color:  rgba(50,211,195,0.5)
}
</style>