<template lang="pug">
  #the-task-detail
    .container(v-if="isShow()")
      .title
        input.task-name(type="text" v-model="getSelectedTask().name" @click="getSelectedTask()" @input="update()")
        p.class-name {{ getSelectedTask().className }}
      .content
        textarea.task-content(v-model="getSelectedTask().content" @change="update()")
      .bottom
        .deadline
          p 2020-06-29 23:59
        a(@click="deleteTask()")
          <svg svg svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="trash-icon svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
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
      selectedIndex: "tasks/selectedIndex",
      classes: "classes/classes",
      classIds: "classes/classIds",
      classNames: "classes/classNames"
    })
  },
  mounted() {},
  methods: {
    ...mapMutations({
      updateTaskData: "tasks/update",
      selectClass: "classes/select"
    }),
    getSelectedTask() {
      return this.tasks[this.selectedIndex]
    },
    isShow() {
      return this.selectedIndex > -1
    },
    update() {
      const params = new URLSearchParams()
      params.append("isPut", "true")
      params.append("userId", this.userId)
      params.append("taskClassId", this.getSelectedTask().classId)
      params.append("taskId", this.getSelectedTask().taskId)
      params.append("taskName", this.getSelectedTask().name)
      params.append("taskDeadline", this.getSelectedTask().deadline)
      params.append("taskContent", this.getSelectedTask().content)

      this.$axios
        .$post(
          "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task.php",
          params
        )
        .then((res) => {})
    },
    deleteTask() {
      const params = new URLSearchParams()
      params.append("isDelete", "true")
      params.append("userId", this.userId)
      params.append("taskClassId", this.getSelectedTask().classId)
      params.append("taskId", this.getSelectedTask().taskId)

      this.$axios
        .$post(
          "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task.php",
          params
        )
        .then((res) => {
          this.selectClass(-1)
          this.updateTaskData(res)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
#the-task-detail
  position: relative
  background-color: #fff
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05)
  margin: 2rem
  border-radius: 2rem
  backface-visibility: hidden
  input, textarea
    outline: none
    border: none
    background-color: #fff
  textarea
    width: 100%
    height: 100%
    resize: none
    color: #9e9e9e
  .container
    position: absolute
    width: calc(100% - 4rem)
    height: calc(100% - 3rem)
    top: 1.5rem
    left: 2rem
    display: grid
    grid-template-columns: 100%
    grid-template-rows: 3rem auto 2rem
    background-color: #fff
    .title
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .task-name
        font-size: 1.2rem
        width: 30%
        flex-grow: 1
      .class-name
        color: #9e9e9e
        flex-shrink: 0
    .content
      color: #9e9e9e
      margin-top: 1rem
    .bottom
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
    .trash-icon
      height: 1.2rem
      cursor: pointer
</style>
