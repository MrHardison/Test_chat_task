<template>
	<div class="login-container">
		<span>Login</span>
		<div class="input-box">
			<input
				v-model="username"
				type="text"
				maxlength="25"
				placeholder="Enter your login">
		</div>
		<btn
			@click.native="login">
			Confirm
		</btn>
		<div
			v-if="error"
			class="error">
			Username must be more than 1 char
		</div>
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
				return this.error = true
      }
      localStorage.setItem('username', this.username)
			this.$router.push('/')
		}
	}
}
</script>

<style scoper lang="sass">

</style>
