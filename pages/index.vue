<template>
	<div class="container">
		<ul
			v-if="messages.length"
			class="list">
			<template v-for="(message, index) in messages">
				<li
					:key=index
					class="message">
					<div class="text">{{ message.text }}</div>
					<div class="date">{{ message.date }}</div>
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
				@click.native="addNewMessage">
				>
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
			message: ''
		}
	},
	computed: {
		...mapGetters({ messages: 'storeData/getMessages' }),
		getCurrentUser() {
			return localStorage.getItem('username')
		},
		getCurrentTime() {
			const date = new Date()
			return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getFullYear()}`
		}
	},
	methods: {
		...mapMutations({ addMessage: 'storeData/addMessage' }),
		addNewMessage() {
			this.addMessage({
				text: this.message,
				user: this.getCurrentUser,
				date: this.getCurrentTime
			})
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
			padding: 5px 0

			& ~ .message
				border-top: 1px solid #030303
</style>

