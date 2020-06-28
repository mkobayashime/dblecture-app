export const state = () => ({
  classes: []
})

export const getters = {
  classes: (state) => state.classes
}

export const mutations = {
  update(state, data) {
    state.classes = data
  }
}
