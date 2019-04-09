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
							<div class="delete">
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
							<li
								:key=index
								class="message"
								@click="selectMessage(message)">
								<div class="message-user">{{message.user}}</div>
								<div class="message-content">
									<div class="text">{{ message.text }}</div>
									<div class="date">{{ message.date }}</div>
								</div>
								<!-- <div
									v-if="message.user === getCurrentUser"
									class="message-edit"
									@click="editMessage(message.text)">
								<fa
									:icon="['far', 'edit']"
									class="fa-icon" />
								</div>
								<div
									v-if="message.user === getCurrentUser"
									class="message-delete"
									@click="deleteMessage(message)">
								<fa
									:icon="['far', 'trash-alt']"
									class="fa-icon" />
								</div> -->
							</li>
						</template>
					</ul>
				</div>
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
			this.addMessage({
				text: this.message,
				user: this.getCurrentUser,
				date: this.getCurrentTime
			})
			this.message = ''
		},
		selectMessage(message) {
			this.selectedMessage = message
			this.panel = true
		},
		editMessage() {
			this.edit = true
			thie.selectMessage.text = this.message
		},
		saveEditedMessage() {
			this.selectMessage.text = this.message
			this.updateMessages(this.messageList)
			this.message = ''
			this.edit = false
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
				background: $grey-light
				display: flex
				height: 100%
				left: 50%
				padding: 0 60px
				position: absolute
				transition: transform .3s
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
					transition: color .3s
					text-transform: uppercase
					cursor: pointer

					&:hover
						color: $black

				.edit, .delete
					color: #CDCDCD
					cursor: pointer
					font-size: 20px
					display: inline-flex
					margin-left: 20px
					transition: color .3s

					&:hover
						color: $black

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
			padding: 0 60px
			width: 100%

			.list
				padding: 30px 0
				width: 100%

				.message
					align-items: center
					display: flex
					flex-wrap: wrap
					padding: 20px 0
					position: relative
					justify-content: space-between
					width: 100%

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
							font-size: 14px
							color: #D1D1D1

					& ~ .message
						border-top: 1px solid $grey

	.input-container
		align-items: center
		background: $grey-light
		display: flex
		height: 15%
		padding: 0 60px
		width: 100%
</style>

