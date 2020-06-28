<template lang="pug">
  .container
    theProfile(:userId="userId")
    theClasses(:userId="userId")
    theTasks(:userId="userId")
    theTaskDetail(:userId="userId")
    //- theActivity(:userId="userId")
    theTaskEditDialogue(:userId="userId" v-if="showTaskEditDialogue")
</template>

<script>
import { mapGetters } from "vuex"
export default {
  components: {
    theProfile: () => import("~/components/theProfile.vue"),
    theClasses: () => import("~/components/theClasses.vue"),
    theTasks: () => import("~/components/theTasks.vue"),
    theTaskDetail: () => import("~/components/theTaskDetail.vue"),
    // theActivity: () => import("~/components/theActivity.vue"),
    theTaskEditDialogue: () => import("~/components/theTaskEditDialogue.vue")
  },
  data() {
    return {
      userId: 202099999
    }
  },
  computed: {
    ...mapGetters({
      showTaskEditDialogue: "taskEditDialogue/show"
    })
  }
}
</script>

<style lang="sass">
.container
  position: absolute
  width: 100%
  height: 100%
  left: 0
  top: 0
  display: grid
  grid-template-rows: 6rem auto 35%
  grid-template-columns: 20rem auto 30rem
  background-color: #eee
  #the-profile
    grid-row: 1/2
    grid-column: 1/2
  #the-classes
    grid-row: 2/-1
    grid-column: 1/2
  #the-tasks
    grid-row: 1/-1
    grid-column: 2/3
  #the-task-detail
    grid-row: 1/4
    grid-column: -2/-1
  // #the-activity
  //   grid-row: -2/-1
  //   grid-column: -2/-1
</style>
