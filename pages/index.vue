<template>
  <div class="container">
    <header class="header">
      <div
        class="logout"
        @click="logout">
        Logout
      </div>
    </header>
    <ul
      v-if="messages.length"
      class="list">
      <template v-for="(message, index) in messageList">
        <li
          :key=index
          class="message">
          <div class="message-user">{{message.user}}</div>
          <div class="message-content">
            <div class="text">{{ message.text }}</div>
            <div class="date">{{ message.date }}</div>
          </div>
          <div
            v-if="message.user === getCurrentUser"
            class="message-edit"
            @click="editMessage(message.text)">
          <fa
            :icon="['far', 'edit']"
            class="fa-icon" />
          </div>
        </li>
      </template>
    </ul>
    <div class="input-container">
      <div class="input-block">
        <input
          v-model="message"
          type="text"
          placeholder="Enter the message"
          maxlength="255">
      </div>
      <btn
        v-if="!edit"
        @click.native="addNewMessage">
        add
      </btn>
      <btn
        v-else
        @click.native="saveEditedMessage">
        edit
      </btn>
    </div>
  </div>
</template>

<script>

import btn from '~/components/button'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { btn },
  middleware: 'index',
  data() {
    return {
      message: '',
      edit: false,
      editItem: {}
    }
  },
  computed: {
    ...mapGetters({ messages: 'data/getMessages' }),
    messageList() {
      let list = []
      _.forEach(this.messages, item => {
        list.push(_.assign({}, item))
      })
      return list
    },
    getCurrentUser() {
      return localStorage.getItem('username')
    },
    getCurrentTime() {
      const date = new Date()
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getFullYear()}`
    }
  },
  methods: {
    ...mapMutations({
      addMessage: 'data/addMessage',
      updateMessages: 'data/updateMessages'
    }),
    addNewMessage() {
      this.addMessage({
        text: this.message,
        user: this.getCurrentUser,
        date: this.getCurrentTime
      })
    },
    editMessage(message) {
      this.edit = true
      this.message = message
      this.editItem = _.find(this.messageList, {
        text: message
      })
    },
    saveEditedMessage() {
      this.editItem.text = this.message
      this.updateMessages(this.messageList)
      this.edit = false
    },
    logout() {
      localStorage.setItem('username', '')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  padding-top: 20vh
  displey: flex
  justify-content: center

  .list
    box-shadow: 0 1px 20px -2px rgba(#000, .3)

    .message
      position: relative
      padding: 5px 10px

      &-edit
        cursor: pointer
        height: 25px
        position: absolute
        right: 10px
        top: 5px
        width: 25px

        &:hover
          color: red
          display: block

      & ~ .message
        border-top: 1px solid #030303

      &-user
        display: flex
        justify-content: flex-start

      &-content
        display: flex
        justify-content: space-between

</style>

