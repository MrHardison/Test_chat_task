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
				v-if="!messages.length"
				class="label">
				<img
					class="chat-icon"
					src="chat-icon.svg">
			</div>
			<div
				v-else
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
								class="fa-icon" />
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
					class="list-container">
					<ul
						class="list">
						<template v-for="(message, index) in messageList">
							<transition
								:key="index"
								name="fade">
								<li
									:class="{selected: selectedMessage === message, pointer: getCurrentUser === message.user}"
									class="message"
									@click="getCurrentUser === message.user && selectMessage(message)">
									<div class="message-user">{{message.user}}</div>
									<div class="message-content">
										<div class="text">{{ message.text }}</div>
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
					class="confirm"
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
		},
		getCurrentTime() {
			const date = new Date()
			return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
		}
	},
	methods: {
		...mapMutations({
			addMessage: 'data/addMessage',
			updateMessages: 'data/updateMessages'
		}),
		addNewMessage() {
			if (this.message.length) {
				this.addMessage({
					text: this.message,
					user: this.getCurrentUser,
					date: this.getCurrentTime
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
		color: #fff
		align-items: center
		display: flex
		font-size: 14px
		transition: opacity .3s ease-in-out
		text-transform: uppercase
		cursor: pointer

		&:hover
			opacity: .7

		& > .fa-icon
			font-size: 16px
			margin-right: 10px

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

	.wrapper
		height: 85%
		width: 100%

		.user-container
			align-items: center
			background: $grey-light
			display: flex
			height: 10%
			overflow: hidden
			padding: 0 60px
			position: relative
			justify-content: flex-start
			width: 100%

			.functions
				align-items: center
				background: #656565
				display: flex
				height: 100%
				left: 50%
				padding: 0 60px
				position: absolute
				transition: transform .3s ease-in-out
				top: 0
				transform: translate(-50%, -100%)
				justify-content: space-between
				width: 100%
				z-index: 2

				&.active
					transform: translate(-50%, 0)

				.close
					color: #CDCDCD
					font-size: 14px
					transition: opacity .3s ease-in-out
					text-transform: uppercase
					cursor: pointer

					&:hover
						opacity: .7

				.edit, .delete
					color: #CDCDCD
					cursor: pointer
					font-size: 20px
					display: inline-flex
					margin-left: 20px
					transition: opacity .3s ease-in-out

					&:hover
						opacity: .7

				.edit
					margin-left: 0

			.username
				font-size: 18px
				text-transform: capitalize

			.status
				align-items: center
				font-size: 10px
				text-transform: uppercase
				display: inline-flex
				margin-left: 10px

				&::before
					border-radius: 50%
					background: $green
					content: ''
					display: inline
					height: 7px
					margin-right: 5px
					width: 7px

		.list-container
			display: flex
			height: 90%
			overflow-x: hidden
			overflow-y: auto
			width: 100%

			.list
				padding: 30px 0
				width: 100%

				.message
					align-items: center
					display: flex
					flex-wrap: wrap
					padding: 20px 60px
					position: relative
					transition: background .3s ease-in-out
					justify-content: space-between
					width: 100%

					&.pointer
						cursor: pointer

					&.selected
						background: rgba($blue, .1)

					&-user
						color: #000
						display: flex
						font-size: 18px
						margin-bottom: 10px
						text-transform: capitalize
						justify-content: flex-start
						width: 100%

					&-content
						display: flex
						justify-content: space-between
						width: 100%

						.text
							color: $black
							font-size: 14px

						.date
							color: $grey-dark
							font-size: 14px

					& ~ .message
						border-top: 1px solid $grey

	.input-container
		align-items: center
		background: $grey-light
		display: flex
		height: 15%
		padding: 0 60px
		justify-content: space-between
		width: 100%

		.input-block
			width: 70%

			input
				font-size: 16px
				height: 30px

				&::placeholder
					font-size: 14px

		.confirm
			color: #fff
			cursor: pointer
			background: $blue
			border: none
			min-width: 110px
			border-radius: 2px
			padding: 14px 36px
			text-transform: uppercase

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0
</style>

