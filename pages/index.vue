<template>
	<div>
		<header class="header">
			<div class="header-content container">
				<div
					class="logout"
					@click="logout">
					<fa
						:icon="['fas', 'sign-out-alt']"
						class="fa-icon" />
					Logout
				</div>
			</div>
		</header>
		<section class="content container p-0">
			<div
				class="wrapper">
				<div class="user-container">
					<span class="username">{{ getCurrentUser }}</span>
					<span class="status">online</span>
					<div
						:class="{active: panel}"
						class="functions">
						<div
							class="close"
							@click="closePanel">
							<fa
								:icon="['fas', 'times']"
								class="panel-icon" />
								Close
						</div>
						<div>
							<div
								class="edit"
								@click="editMessage">
								<fa
									:icon="['far', 'edit']"
									class="fa-icon" />
							</div>
							<div
								class="delete"
								@click="deleteMessage">
								<fa
									:icon="['far', 'trash-alt']"
									class="fa-icon" />
							</div>
						</div>
					</div>
				</div>
				<div
					v-if="!messages.length"
					class="label">
					<img
						class="chat-icon"
						src="chat-icon.svg">
					<p>Type your first message right now!</p>
				</div>
				<div
					v-else
					v-chat-scroll="{smooth: true, scrollonremoved: true}"
					class="list-container">
					<messages
						:message-list="messageList"
						@selectedMessage="selectedMessage = $event"
						@panel="panel = $event" />
				</div>
			</div>
			<form class="input-container">
				<div class="input-block">
					<fa
						:icon="['far', 'comment-dots']"
						class="message-icon" />
					<input
						v-model="message"
						ref="textField"
						autofocus="true"
						type="text"
						placeholder="Start typing your message..."
						maxlength="255">
				</div>
				<btn
					v-if="!edit"
					class="confirm"
					@click.prevent.native="addNewMessage">
					Send
				</btn>
				<btn
					v-else
					class="btn confirm"
					@click.prevent.native="saveEditedMessage">
					Edit
				</btn>
			</form>
		</section>
	</div>
</template>

<script>

import btn from '~/components/button'
import messages from '~/components/messages'
import { mapGetters, mapMutations } from 'vuex'

export default {
	components: { btn, messages },
	middleware: 'index',
	data() {
		return {
			message: '',
			edit: false,
			panel: false,
			selectedMessage: {}
		}
	},
	computed: {
		...mapGetters({ messages: 'data/getMessages' }),
		messageList() {
			const [...list] = this.messages
			return list
		},
		getCurrentUser() {
			return localStorage.getItem('username')
		}
	},
	methods: {
		...mapMutations({
			addMessage: 'data/addMessage',
			saveMessage: 'data/saveMessage',
			deleteMessageFromStore: 'data/deleteMessageFromStore'
    }),
    getCurrentTime() {
			const today = new Date()
			const date = `${today.getDate()}-${(today.getMonth()+1)}-${today.getFullYear()}`
			return {
				time: today.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
				date: date
				}
		},
		addNewMessage() {
			if (this.message.length) {
				this.addMessage({
					text: this.message,
					user: this.getCurrentUser,
					date: this.getCurrentTime()
				})
				this.message = ''
			}
		},
		editMessage() {
			this.edit = true
			this.panel = false
			this.message = this.selectedMessage.text
			this.$refs.textField.focus()
		},
		saveEditedMessage() {
			if (this.message.length) {
				this.saveMessage({
					item: this.selectedMessage,
					message: this.message
				})
				this.message = ''
				this.edit = false
			}
		},
		deleteMessage() {
			this.panel = false
			this.deleteMessageFromStore(this.selectedMessage)
		},
		closePanel() {
			this.panel = false
			this.selectedMessage = {}
		},
		logout() {
			localStorage.setItem('username', '')
			this.$router.push('/login')
		}
	}
}
</script>

<style lang="sass" scoped>
</style>

