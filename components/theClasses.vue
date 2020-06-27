<template lang="pug">
  #the-classes
    input(type="text" placeholder="科目を追加")
    ul
      li.class(v-for="item in classes" :key="item.id")
        a {{ item }}
</template>

<script>
export default {
  data() {
    return {
      classes: [
        "データ工学概論",
        "情報リテラシー(講義)",
        "知能と情報科学",
        "情報数学A",
        "情報メディア入門B",
        "線形代数A"
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
#the-classes
  background-color: #fff
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05)
  padding: 2rem
  margin: 2rem
  border-radius: 2rem
  input
    display: block
    width: calc(100%)
    height: 2.5rem
    margin: 0 auto 1rem
    padding: 1rem
    border: none
    border-radius: .5rem
    background-color: #eee
    &:focus
      outline: none
  ul
    list-style: none
    display: flex
    flex-direction: column
    li
      position: relative
      margin: 0
      padding: .7rem .5rem
      transition: background 200ms linear
      cursor: pointer
      border-radius: .5rem
      &:hover
        background-color: #eee
      &:after
        content: ""
        position: absolute
        width: calc(100% - 1rem)
        height: 1px
        top: 100%
        left: .5rem
        background-color: #eee
      &:last-of-type
        &:after
          display: none
</style>
