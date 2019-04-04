export const state = () => ({
  username: false
})

export const mutations = {
  setUsername(state, data) {
    state.username = data
  },
  unsetUsername(state) {
    state.username = ''
  }
}

export const getters = {
  getUsername(state) {
    return state.username
  }
}