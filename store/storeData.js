export const state = () => ({
  messages: []
})

export const mutations = {
  addMessage(state, data) {
    state.messages.push(data)
  },
  clearMessages(state) {
    state.messages = []
  }
}

export const getters = {
  getMessages(state) {
    return state.messages
  }
}