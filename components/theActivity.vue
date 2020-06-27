<template lang="pug">
  #the-activity
    ul
      li(v-for="activity in activities")
        p.date {{ activity.submitDate }}
        p.user {{ `${activity.user}さんが提出しました` }}
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          user: "土浦花子",
          submitDate: "2020-06-26 21:03"
        },
        {
          user: "春日次郎",
          submitDate: "2020-06-26 22:54"
        },
        {
          user: "天久保太郎",
          submitDate: "2020-06-27 10:15"
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
#the-activity
  background-color: #fff
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05)
  padding: 2rem
  margin: 0 2rem 2rem 2rem
  border-radius: 2rem
  display: flex
  flex-direction: column
  justify-content: space-between
  ul
    list-style: none
    overflow-y: scroll
    height: 100%
    li
      margin-bottom: 1rem
      .date
        color: #9e9e9e
        font-size: .8rem
</style>
