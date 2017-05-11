<template>
  <div class="showBlog">
    <div class="subHeader">
      <h2>{{blogDetails.title}}</h2>
      <p>{{blogDetails.date}}</p>
    </div>
    <p class="content">{{blogDetails.content}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogDetails: {
        title: 'JavaScript 事件委托详解',
        date: '2017-04-12',
        content:'基本概念,事件委托，通俗地来讲，就是把一个元素响应事件（click、keydown……）的函数委托到另一个元素；一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数；举个例子，比如一个宿舍的同学同时快递到了，一种方法就是他们都傻傻地一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一一分发给每个宿舍同学；在这里，取快递就是一个事件，每个同学指的是需要响应事件的 DOM 元素，而出去统一领取快递的宿舍长就是代理的元素，所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个。'
      }
    }
  }
}
</script>

<style>
.subHeader{
  text-align: center;
  padding: 15px;
}
.subHeader h2 {
  font-size: 1.8rem;
  color: #676767;
  margin: 20px auto;
}
.subHeader p{
  font-size: 0.9rem;
  color: #959595;
}

p.content{
  margin:30px auto;
  padding-bottom: 60px;
}
</style>