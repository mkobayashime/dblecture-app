export const state = () => ({
  classes: [],
  classIds: [],
  classNames: []
})

export const getters = {
  classes: (state) => state.classes,
  classIds: (state) => state.classIds,
  classNames: (state) => state.classNames
}

export const mutations = {
  update(state, data) {
    state.classes = data
    data.forEach((item) => {
      state.classIds.push(item.classId)
      state.classNames.push(item.className)
    })
  }
}
