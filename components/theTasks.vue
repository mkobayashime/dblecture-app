<template lang="pug">
  #the-tasks
    ul
      li.task(v-for="task in tasks" :key="task.id")
        input(type="checkbox").isDone
        p.name {{task.name}}
        p.class {{task.theClass}}
        p.deadline {{task.deadline}}
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          name: "第9回課題",
          deadline: "Tomorrow",
          theClass: "情報数学A"
        },
        {
          name: "レポート10",
          deadline: "Tomorrow",
          theClass: "知能と情報科学"
        },
        {
          name: "課題名サンプル",
          deadline: "Tomorrow",
          theClass: "情報リテラシー(講義)"
        },
        {
          name: "長めの課題名サンプル",
          deadline: "Tomorrow",
          theClass: "データ工学概論"
        },
        {
          name: "第7回課題",
          deadline: "Tomorrow",
          theClass: "情報メディア入門B"
        },
        {
          name: "第8回課題",
          deadline: "Tomorrow",
          theClass: "情報数学A"
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
#the-tasks
  background-color: #fff
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05)
  padding: 1.5rem
  margin: 2rem 0
  border-radius: 2rem
  ul
    list-style: none
    display: flex
    flex-direction: column
    padding: .5rem
    li
      display: flex
      flex-direction: row
      align-items: center
      position: relative
      padding: .7rem 0rem
      transition: background 200ms linear
      cursor: pointer
      &:hover
        background-color: #eee
      &::before
        content: ""
        position: absolute
        width: 100%
        height: 1px
        top: 100%
        left: 0
        background-color: #eee
      &:last-of-type
        &::before
          display: none
      .isDone
        width: 3rem
        flex-shrink: 0
      .name
        width: 50%
        font-weight: 700
      .class
        width: 30%
        font-size: .8rem
      .deadline
        width: 7rem
        padding-right: .5rem
        flex-shrink: 0
        text-align: right
        font-size: .8rem
        color: #bdbdbd
</style>
