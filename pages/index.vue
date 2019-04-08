<template>
	<div>
		<header class="header">
			<div class="header-content container">
				<div
					class="logout"
					@click="logout">
					Logout
				</div>
			</div>
		</header>
		<section class="content container p-0">
			<div
				v-if="!messages.length"
				class="label">
				<img
					class="chat-icon"
					src="chat-icon.svg">
			</div>
			<div
				v-else
				class="list-container">
				<ul
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
			</div>
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
.header
	background: $blue
	height: 50px
	display: flex
	margin-bottom: 30px
	position: relative

	&::after
		background: $blue-light
		content: ''
		height: 30vh
		display: flex
		position: absolute
		left: 50%
		top: 100%
		transform: translateX(-50%)
		width: 100%

	&-content
		align-items: center
		justify-content: flex-end
		width: 1170px

	.logout
		cursor: pointer

.content
	background: #fff
	border-radius: 2px
	box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)
	display: flex
	height: 88vh
	flex-wrap: wrap
	justify-content: center

	.label
		display: flex
		justify-content: center
		height: 250px
		width: 100%

	.list-container
		height: 75%
		display: flex
		overflow-x: hidden
		overflow-y: auto
		width: 100%

		.list
			height: auto

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

	.input-container
		align-items: center
		background: $grey-light
		display: flex
		padding: 0 60px
		width: 100%
</style>

