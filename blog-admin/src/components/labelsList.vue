<template>
  <div class="showLabels">
  <h1>标签</h1>
  <div  class="labelList">
    <label v-for='(item, index) in labels' v-if='deleteLab.indexOf(index) == -1'>
        <span>{{item.name}}</span>(<span>{{item.article.length}}</span>)
        <span class="cover-item check"  @click="showLabelBlogs(item._id)"><i class="iconfont icon-fangdajing"></i></span><span class="cover-item delete" @click="deleteLabel(item._id, index)"><i class="iconfont icon-shanchu"></i></span>
    </label>
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
      newLabelName: '',
      deleteLab: []
    }
  },
  created: function(){
    this.$http.get('/admin/labels/list').then(
        respones => {
            this.labels = respones.body
            console.log(this.labels);
        },
        respone => alert('标签获取失败')
    )       
  },
  methods: {
    showLabelBlogs: function( label ) {
      this.$router.push({path:'/labelDetails/' + label});
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
            response => {
                self.labels.push({name: self.newLabelName, article: [], _id: response.body});
                self.newLabelName=''; 
            },
            response => {
              alert('标签添加失败');
              self.newLabelName=''; 
            }
        )   
      }

    },
    deleteLabel(id, index) {
      if (confirm('确定删除该标签？')){
        let url = '/admin/labelDelete/' + id
        console.log(url)
        let self =this
        self.$http.delete(url).then(
          response => {
            if(response.body.success){
              self.deleteLab.push(index)
            }
          },
          response => {
            console.log(response)
          })
      }      
    }   
  }
}
</script>

<style>
h1{
  font-size: 1.2rem;
}
.showLabels{
  color: #8c8c89;
  margin: 1rem auto;
  width: 80%;
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
  margin: 0.2rem 0.2rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 0.9rem;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.showLabels label:hover{
  background-color: rgba(135,135,141,.9);
}
.showLabels label:hover .cover-item{
  display: inline-block;
}
.showLabels .cover-item:hover{
  background-color: rgba(100,100,110,.5);
}
.showLabels .cover-item:hover .icon-fangdajing:before{
  color: #32d3c3;
}
.showLabels .cover-item:hover .icon-shanchu:before{
  color: #32d3c3;
}
.showLabels .cover-item{
  position: absolute;
  top: 0;
  width: 50%;
  text-align: center;
  line-height: 1.6rem;
  display: none;
}
.showLabels .check{
  left: 0;
}
.showLabels .delete{
  left: 50%;
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
  padding: 0 0.4rem;
  margin: 0.3rem 0;
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