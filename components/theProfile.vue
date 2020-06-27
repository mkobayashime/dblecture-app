<template lang="pug">
  #the-profile
    .name {{ profile.userName }}
      span.id {{ `#${userId}` }}
    .dept {{ profile.deptName }}
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      profile: {}
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const res = await this.$axios.$get(
        "http://turkey.slis.tsukuba.ac.jp/~s2010127/api/profile.php",
        {
          params: {
            userId: this.userId
          }
        }
      )
      this.profile = res
    }
  }
}
</script>

<style lang="sass" scoped>
#the-profile
  padding: 2rem
  .name
    font-size: 1.5rem
    font-weight: 700
    .id
      font-size: 1rem
      margin-left: .5em
      color: #9e9e9e
      font-weight: 400
  .dept
    font-size .5rem
</style>
