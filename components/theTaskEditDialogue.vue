<template lang="pug">
  #the-task-edit-dialogue
    .dialogue-container
      h2 課題を追加
      .taskName.section
        label 課題名
        input(type="text" :class="{ error: newTask.taskNameError }" placeholder="課題名" v-model="newTask.taskName" @blur="validateTaskName")
      .taskClass.section
        label 授業を選択
        select(v-model="newTask.taskClass" :class="{ error: newTask.taskClassError }" @blur="validateTaskClass")
          option(v-for="item in classes") {{ item.className }}
      .taskDeadline.section
        label 締め切りを入力
        .datetime
          input(type="text" :class="{ error: newTask.deadlineYearError }" placeholder="年" v-model="newTask.deadlineYear" @blur="validateDeadlineYear")
          input(type="text" :class="{ error: newTask.deadlineMonthError }" placeholder="月" v-model="newTask.deadlineMonth" @blur="validateDeadlineMonth")
          input(type="text" :class="{ error: newTask.deadlineDayError }" placeholder="日" v-model="newTask.deadlineDay" @blur="validateDeadlineDay")
          input(type="text" :class="{ error: newTask.deadlineHourError }" placeholder="時" v-model="newTask.deadlineHour" @blur="validateDeadlineHour")
          input(type="text" :class="{ error: newTask.deadlineMinuteError }" placeholder="分" v-model="newTask.deadlineMinute" @blur="validateDeadlineMinute")
      .send.section
        button(@click="validateAll") 追加
      a(@click="toggleTaskEditDialogue()")
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" class="close-btn svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>
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
    return {
      newTask: {
        taskName: "",
        taskNameError: "",
        taskClass: "",
        taskClassError: "",
        deadlineYear: "2020",
        deadlineYearError: "",
        deadlineMonth: "",
        deadlineMonthError: "",
        deadlineDay: "",
        deadlineDayError: "",
        deadlineHour: "",
        deadlineHourError: "",
        deadlineMinute: "",
        deadlineMinuteError: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      classes: "classes/classes",
      classIds: "classes/classIds",
      classNames: "classes/classNames",
      tasks: "tasks/tasks"
    })
  },
  methods: {
    ...mapMutations({
      toggleTaskEditDialogue: "taskEditDialogue/toggle",
      updateTaskData: "tasks/update"
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
    validateTaskName() {
      if (this.newTask.taskName.length > 0) {
        this.newTask.taskNameError = false
      } else {
        this.newTask.taskNameError = true
      }
    },
    validateTaskClass() {
      if (this.newTask.taskClass.length > 0) {
        this.newTask.taskClassError = false
      } else {
        this.newTask.taskClassError = true
      }
    },
    validateDeadlineYear() {
      if (this.newTask.deadlineYear.length === 4) {
        this.newTask.deadlineYearError = false
      } else {
        this.newTask.deadlineYearError = true
      }
    },
    validateDeadlineMonth() {
      if (this.newTask.deadlineMonth > 0 && this.newTask.deadlineMonth <= 12) {
        this.newTask.deadlineMonthError = false
      } else {
        this.newTask.deadlineMonthError = true
      }
    },
    validateDeadlineDay() {
      if (this.newTask.deadlineDay > 0 && this.newTask.deadlineDay <= 31) {
        this.newTask.deadlineDayError = false
      } else {
        this.newTask.deadlineDayError = true
      }
    },
    validateDeadlineHour() {
      if (
        this.newTask.deadlineHour.length > 0 &&
        this.newTask.deadlineHour >= 0 &&
        this.newTask.deadlineHour <= 24
      ) {
        this.newTask.deadlineHourError = false
      } else {
        this.newTask.deadlineHourError = true
      }
    },
    validateDeadlineMinute() {
      if (
        this.newTask.deadlineMinute.length > 0 &&
        this.newTask.deadlineMinute >= 0 &&
        this.newTask.deadlineMinute <= 60
      ) {
        this.newTask.deadlineMinuteError = false
      } else {
        this.newTask.deadlineMinuteError = true
      }
    },
    validateAll() {
      this.validateTaskName()
      this.validateTaskClass()
      this.validateDeadlineYear()
      this.validateDeadlineMonth()
      this.validateDeadlineDay()
      this.validateDeadlineHour()
      this.validateDeadlineMinute()
      if (
        !this.newTask.taskNameError &&
        !this.newTask.taskClassError &&
        !this.newTask.deadlineYearError &&
        !this.newTask.deadlineMonthError &&
        !this.newTask.deadlineDayError &&
        !this.newTask.deadlineHourError &&
        !this.newTask.deadlineMinuteError
      ) {
        this.sendNewTask()
      }
    },
    sendNewTask() {
      const datetime = `${this.newTask.deadlineYear}-${this.getDoubleDigits(
        this.newTask.deadlineMonth
      )}-${this.getDoubleDigits(
        this.newTask.deadlineDay
      )} ${this.getDoubleDigits(
        this.newTask.deadlineHour
      )}:${this.getDoubleDigits(this.newTask.deadlineMinute)}:00`

      const indexOfClassName = this.classNames.indexOf(this.newTask.taskClass)
      const taskClassId = this.classIds[indexOfClassName]

      const params = new URLSearchParams()
      params.append("userId", this.userId)
      params.append("taskName", this.newTask.taskName)
      params.append("taskClassId", taskClassId)
      params.append("taskDeadline", datetime)

      this.$axios
        .$post(
          "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task.php",
          params
        )
        .then((res) => {
          this.updateTaskData(res)
          this.toggleTaskEditDialogue()

          this.$axios
            .$get(
              "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/get-task-id.php",
              {
                params: {
                  taskClassId,
                  taskName: this.newTask.taskName
                }
              }
            )
            .then((res) => {
              params.append("method", "init")
              params.append("taskId", res.taskId)
              this.$axios
                .$post(
                  "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/task-status.php",
                  params
                )
                .then(() => {
                  this.load()
                })
            })
        })
    },
    getDoubleDigits(num) {
      return ("0" + num).slice(-2)
    }
  }
}
</script>

<style lang="sass" scoped>
#the-task-edit-dialogue
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center
  background-color: rgba(0,0,0,0.2)
  z-index: 10
  .dialogue-container
    position: relative
    padding: 2rem
    border-radius: 2rem
    background-color: #fff
    h2
      font-size: 1.2rem
      margin-bottom: 2rem
    .section
      margin-bottom: 2rem
      &:last-of-type
        margin-bottom: 0
      label
        display: block
        margin-bottom: .5rem
    input, select
      outline: none
      border: none
      background-color: #eee
      height: 2.5rem
      width: 20rem
      padding: 0 1rem
      border-radius: .5rem
      &:focus
        outline: none
      &.error
        background-color: #ffcdd2
    .taskDeadline
      input
        width: 5rem
        margin-right: .5rem
        &:last-of-type
          margin-right: 0
    .send
      button
        background-color: #1e88e5
        outline: none
        border: none
        color: white
        height: 2.5rem
        padding: 0 1rem
        border-radius: .5rem
        cursor: pointer
    .close-btn
      position: absolute
      height: 1.5rem
      top: 2rem
      right: 2rem
      cursor: pointer
</style>
