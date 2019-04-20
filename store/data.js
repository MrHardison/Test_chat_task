export const state = () => ({
  messages: []
})

export const mutations = {
  addMessage(state, data) {
    state.messages.push(data)
  },
  saveMessage(state, data) {
		const item = _.find(state.messages, data.item)
		if (item) {
			item.text = data.message
		}
  },
  deleteMessageFromStore(state, data) {
    state.messages = _.without(state.messages, data)
  }
}

export const getters = {
  getMessages(state) {
    return state.messages
  }
}