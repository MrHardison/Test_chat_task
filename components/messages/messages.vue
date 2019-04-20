<template>
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
						<div class="date">
							<div class="current-time">{{ message.date.time }}</div>
							<div class="current-date">{{ message.date.date }}</div>
						</div>
					</div>
				</li>
			</transition>
		</template>
	</ul>
</template>

<script>
export default {
	name: 'Messages',
	props: {
		messageList: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			selectedMessage: {}
		}
	},
	computed: {
		getCurrentUser() {
			return localStorage.getItem('username')
		}
	},
	methods: {
		upperCase(string) {
			return _.toUpper(string)
		},
		selectMessage(message) {
			this.selectedMessage = message
			this.$emit('selectedMessage', this.selectedMessage)
			this.$emit('panel', true)
		},
	}
}
</script>

<style>

</style>
