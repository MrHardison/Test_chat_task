<template>
	<div class="login-container">
		<form class="window">
			<span class="title">Login</span>
			<div class="input-block">
				<input
					v-model="username"
					type="text"
					maxlength="25"
					placeholder="Enter your login">
			</div>
			<btn
				class="btn"
				@click.prevent.native="login">
				Confirm
			</btn>
			<transition name="fade">
				<div
					v-if="error"
					class="error">
					<fa
						:icon="['fas', 'exclamation-circle']"
						class="error-icon" />
					Username must be more than 1 char
				</div>
			</transition>
		</form>
	</div>
</template>

<script>
import btn from '~/components/button'
import { mapMutations, mapGetters } from 'vuex'

export default {
	name: 'Login',
	components: {
		btn
  },
  middleware: 'login',
	data() {
		return {
			username: '',
			error: false
		}
	},
	methods: {
		login() {
			if (this.username.length < 2) {
				if (!this.error) {
					_.delay(() => {
						this.error = false
					}, 2000)
					return this.error = true
				}
      }
      localStorage.setItem('username', this.username)
			this.$router.push('/')
		}
	}
}
</script>

<style scoper lang="sass">
.login-container
	align-items: center
	height: 100vh
	display: flex
	justify-content: center
	width: 100vw

	.window
		align-items: center
		box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)
		display: flex
		padding: 20px 30px
		justify-content: center
		flex-direction: column

		.title
			font-size: 18px
			margin-bottom: 30px

		.input-block
			margin-bottom: 30px
			width: 100%

			input
				height: 40px

		.btn
			color: #fff
			cursor: pointer
			background: $blue
			border: none
			border-radius: 2px
			padding: 14px 36px
			text-transform: uppercase
			width: 100%

		.error
			align-items: center
			display: flex
			font-size: 14px
			margin-top: 30px
			justify-content: flex-start

			.error-icon
				color: $red
				font-size: 16px
				margin-right: 10px
</style>
