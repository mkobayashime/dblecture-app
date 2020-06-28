export const state = () => ({
  classes: [],
  classIds: [],
  classNames: [],
  selectedIndex: -1
})

export const getters = {
  classes: (state) => state.classes,
  classIds: (state) => state.classIds,
  classNames: (state) => state.classNames,
  selectedIndex: (state) => state.selectedIndex
}

export const mutations = {
  update(state, data) {
    state.classes = data
    data.forEach((item) => {
      state.classIds.push(item.classId)
      state.classNames.push(item.className)
    })
  },
  select(state, index) {
    if (state.selectedIndex !== index) {
      state.selectedIndex = index
    } else {
      state.selectedIndex = -1
    }
  }
}
