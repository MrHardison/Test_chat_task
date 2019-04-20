<template>
	<div class="login-container">
		<form class="window">
			<span class="title">Login</span>
			<div class="input-block">
				<input
					v-model="username"
					autofocus="true"
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
					Login must be more than 1 char
				</div>
			</transition>
		</form>
	</div>
</template>

<script>
import btn from '~/components/button'

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
</style>
