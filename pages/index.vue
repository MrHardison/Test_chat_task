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
					<ul
						ref="list"
						class="list">
						<template v-for="(message, index) in messageList">
							<transition
								:key="index"
								name="fade">
								<li
									:class="{my: upperCase(getCurrentUser) === upperCase(message.user), selected: selectedMessage === message, pointer: upperCase(getCurrentUser) === upperCase(message.user)}"
									class="message"
									@click="upperCase(getCurrentUser) === upperCase(message.user) && selectMessage(message)">
									<div class="message-user">{{message.user}}</div>
									<div class="message-content">
										<p class="text">{{ message.text }}</p>
										<div class="date">{{ message.date }}</div>
									</div>
								</li>
							</transition>
						</template>
					</ul>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
	components: { btn },
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
			let list = []
			_.forEach(this.messages, item => {
				list.push(_.assign({}, item))
			})
			return list
		},
		getCurrentUser() {
			return localStorage.getItem('username')
		}
	},
	mounted() {
		this.$refs.textField.focus()
	},
	methods: {
		...mapMutations({
			addMessage: 'data/addMessage',
			updateMessages: 'data/updateMessages'
    }),
    getCurrentTime() {
			const date = new Date()
			return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
		},
		upperCase(string) {
			return _.toUpper(string)
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
		selectMessage(message) {
			this.selectedMessage = message
			this.panel = true
		},
		editMessage() {
			this.edit = true
			this.panel = false
			this.message = this.selectedMessage.text
			this.$refs.textField.focus()
		},
		saveEditedMessage() {
			if (this.message.length) {
				const item = _.find(this.messageList, this.selectedMessage)
				item.text = this.message
				this.updateMessages(this.messageList)
				this.message = ''
				this.edit = false
			}
		},
		deleteMessage() {
			this.panel = false
			const newList = _.without(this.messageList, this.selectedMessage)
			this.updateMessages(newList)
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

