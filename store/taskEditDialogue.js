export const state = () => ({
  show: false
})

export const getters = {
  show: (state) => state.show
}

export const mutations = {
  toggle(state) {
    state.show = !state.show
  }
}
