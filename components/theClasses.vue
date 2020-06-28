<template lang="pug">
  #the-classes
    .input
      input(type="text" :class="{ 'class-name': true, error: newClass.classNameError }" placeholder="科目を追加（科目名）" v-model="newClass.className" @keyup.enter="focusClassIdInput")
      input(type="text" :class="{ 'class-id': true, error: newClass.classIdError }" placeholder="科目番号" v-model="newClass.classId" @keyup.enter="validateNewClass")
    ul
      li.class(v-for="item in classes" :key="item.id")
        a {{ item.className }}
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
      newClass: {
        classId: "",
        classIdError: false,
        className: "",
        classNameError: false
      }
    }
  },
  computed: {
    ...mapGetters({
      classes: "classes/classes"
    })
  },
  mounted() {
    this.load()
  },
  methods: {
    ...mapMutations({
      updateClassesData: "classes/update"
    }),
    async load() {
      const res = await this.$axios.$get(
        "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/class.php",
        {
          params: {
            userId: this.userId
          }
        }
      )
      this.updateClassesData(res)
    },
    validateNewClass() {
      const match = new RegExp("^[A-Z0-9]{7}$")
      if (!match.test(this.newClass.classId)) {
        this.newClass.classIdError = true
      } else {
        this.newClass.classIdError = false
      }

      if (!this.newClass.className.length > 0) {
        this.newClass.classNameError = true
      } else {
        this.newClass.classNameError = false
      }

      if (!this.newClass.classIdError && !this.newClass.classNameError) {
        this.addNewClass()
      }
    },
    addNewClass() {
      const params = new URLSearchParams()
      params.append("userId", this.userId)
      params.append("classId", this.newClass.classId)
      params.append("className", this.newClass.className)

      this.$axios
        .$post(
          "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/class.php",
          params
        )
        .then((res) => {
          this.updateClassesData(res)

          document.activeElement.blur()
          this.newClass = {}
        })
    },
    focusClassIdInput() {
      document.querySelector(".input .class-id").focus()
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
  .input
    position: relative
    display: block
    width: 100%
    height: 2.5rem
    margin: 0 auto 1rem
    padding: 0 1rem
    border-radius: .5rem
    background-color: #eee
    overflow: hidden
    transition: height 200ms ease-in-out
    input
      position: absolute
      height: 2.5rem
      border: none
      background-color: #eee
      outline: none
    .class-name
      top: 0
    .class-id
      top: 2.5rem
    &:focus-within
      height: 5rem
  .error
    color: #e53935
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
