<template lang="pug">
  #the-tasks
    button(@click="toggleTaskEditDialogue()") 課題を追加
    ul
      li.task(v-for="task, index in tasks" :key="task.id" @click="selectTask(index)" :class="{ selected: isSelected(index) }")
        input(type="checkbox").isDone
        p.name {{task.name}}
        p.class {{task.className}}
        p.deadline {{task.deadline}}
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      tasks: "tasks/tasks",
      selectedIndex: "tasks/selectedIndex"
    })
  },
  mounted() {
    this.load()
  },
  methods: {
    ...mapMutations({
      toggleTaskEditDialogue: "taskEditDialogue/toggle",
      updateTaskData: "tasks/update",
      selectTask: "tasks/select"
    }),
    async load() {
      const res = await this.$axios.$get(
        "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task.php",
        {
          params: {
            userId: this.userId
          }
        }
      )
      this.updateTaskData(res)
    },
    isSelected(i) {
      return this.selectedIndex === i
    }
  }
}
</script>

<style lang="sass" scoped>
#the-tasks
  position: relative
  background-color: #fff
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05)
  padding: 1.5rem
  margin: 2rem 0
  border-radius: 2rem
  button
    background-color: #1e88e5
    outline: none
    border: none
    color: white
    height: 2.5rem
    padding: 0 1rem
    border-radius: .5rem
    margin-left: .5rem
    cursor: pointer
  ul
    position: absolute
    bottom: 0
    margin-right: 2rem
    width: calc(100% - 4rem)
    height: calc(100% - 5rem)
    list-style: none
    display: flex
    flex-direction: column
    padding: .5rem
    overflow-y: scroll
    li
      display: flex
      flex-direction: row
      align-items: center
      position: relative
      padding: .7rem 0rem
      transition: background 200ms linear
      cursor: pointer
      border-radius: .5rem
      &:hover
        background-color: #eee
      &.selected
        background-color: #e3f2fd
      &::before
        content: ""
        position: absolute
        width: calc(100% - 1rem)
        height: 1px
        top: 100%
        left: .5rem
        background-color: #eee
      &:last-of-type
        margin-bottom: 1rem
        &::before
          display: none
      .isDone
        width: 3rem
        flex-shrink: 0
      .name
        width: 50%
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
