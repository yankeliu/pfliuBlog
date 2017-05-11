var mongoose = require('mongoose')/*引入建模工具模块mongoose*/
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ArticleSchema = new Schema({
  title: String,
  label: [{type: ObjectId, ref: 'Label'}],
  state: Number,
  articleContent: String,
  meta: {  /*记录更新或录入的时间*/
    createAt: {/*创建时间*/
      type: Date,
      default: Date.now()
    },
    updateAt: {/*更新时间*/
      type: Date,
      default: Date.now()
    }
  }
})

/*为模式添加一个方法*/
ArticleSchema.pre('save', function(next) {  /*每次存储数据之前都会调用这个方法*/
  if (this.isNew){ /*判断数据是否是新加的*/
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()/*必须调用的pre save的方法，使存储流程走下去*/
})

/*这里的静态方法不会与数据库进行直接交互，只有经过Model编译、进行实例化之后才会具有这个方法*/
ArticleSchema.statics = {
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
var Article = mongoose.model('Article', ArticleSchema)/*编译生成Article模型*/

/*将模式导出*/
module.exports = Article