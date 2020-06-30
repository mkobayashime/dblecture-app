<template lang="pug">
  #the-tasks
    button(@click="toggleTaskEditDialogue()") 課題を追加
    ul
      li.task(v-for="task, index in tasks" :key="task.classId + task.taskId" @click="selectTask(index)" :class="{ selected: isSelected(index), done: isDone(task.submitDate)}")
        input(type="checkbox" :checked="isDone(task.submitDate)" @input="toggleDone($event.target)" :class-id="task.classId" :task-id="task.taskId").isDone
        p.name {{ task.name }}
        p.class {{ task.className }}
        p.deadline {{ relativeDeadline(task.deadline) }}
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

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
      selectedTaskIndex: "tasks/selectedIndex",
      classIds: "classes/classIds",
      selectedClassIndex: "classes/selectedIndex"
    })
  },
  watch: {
    selectedClassIndex() {
      this.filterClassId = this.classIds[this.selectedClassIndex]
      this.load()
    }
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
            userId: this.userId,
            filterClassId: this.filterClassId
          }
        }
      )
      this.updateTaskData(res)
    },
    relativeDeadline(deadlineString) {
      const now = dayjs()
      const target = dayjs(deadlineString, "YYYY-MM-DD HH:mm")
      const diffDays = target.diff(now, "day")

      if (diffDays <= 0) {
        const diffSeconds = target.diff(now, "second")
        if (diffSeconds < 0) {
          return "Overdue"
        } else {
          return "Tomorrow"
        }
      } else {
        return `in ${diffDays + 1} days`
      }
    },
    isSelected(i) {
      return this.selectedTaskIndex === i
    },
    isDone(submitDate) {
      return submitDate !== null
    },
    toggleDone(target) {
      const params = new URLSearchParams()
      params.append("userId", this.userId)
      params.append("taskClassId", target.attributes["class-id"].value)
      params.append("taskId", target.attributes["task-id"].value)

      if (target.checked) {
        params.append("method", "done")
        this.$axios
          .$post(
            "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task-status.php",
            params
          )
          .then(() => {
            this.load()
          })
      } else {
        params.append("method", "undone")
        this.$axios
          .$post(
            "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task-status.php",
            params
          )
          .then(() => {
            this.load()
          })
      }
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
        margin-left: 1rem
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
      &.done
        .name
          color: #bdbdbd
        .class
          color: #bdbdbd
</style>
