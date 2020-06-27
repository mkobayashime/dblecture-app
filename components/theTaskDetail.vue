<template lang="pug">
  #the-task-detail
    .top
      .title
        h2 第9回課題
        p.class 情報数学A
      .content
        p 第15章の演習問題を解いてレポートとして提出してください。
        p 自己採点もすること。
    .bottom
      .deadline
        p 2020-06-29 23:59
      a
        <svg svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="trash-icon svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
#the-task-detail
  background-color: #fff
  box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.05)
  padding: 2rem
  margin: 2rem
  border-radius: 2rem
  display: flex
  flex-direction: column
  justify-content: space-between
  .top
    .title
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      h2
        font-size: 1.2rem
      .class
        color: #9e9e9e
    .content
      color: #9e9e9e
      margin-top: 1rem
  .bottom
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .trash-icon
      height: 1.2rem
      cursor: pointer
</style>
