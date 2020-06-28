export const state = () => ({
  tasks: [],
  selectedIndex: 0
})

export const getters = {
  tasks: (state) => state.tasks,
  selectedIndex: (state) => state.selectedIndex
}

export const mutations = {
  update(state, data) {
    state.tasks = data
  },
  select(state, index) {
    state.selectedIndex = index
  }
}
