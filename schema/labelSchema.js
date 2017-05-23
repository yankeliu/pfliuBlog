var mongoose = require('mongoose')/*引入建模工具模块mongoose*/
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var LabelSchema = new Schema({
  name: String,
  article:  [{type: ObjectId, ref: 'Article'}]
})

/*这里的静态方法不会与数据库进行直接交互，只有经过Model编译、进行实例化之后才会具有这个方法*/
LabelSchema.statics = {
  /*用来取出目前数据库里面所有的数据*/
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')/*按照更新时间排序*/
      .exec(cb)/*执行回调方法*/
  },
  findById: function(id, cb) {/*用来查询单条数据*/
    return this
      .findOne({_id: id})
      .exec(cb)/*执行回调方法*/
  }  
}
var Label = mongoose.model('Label', LabelSchema)

/*将模式导出*/
module.exports = Label