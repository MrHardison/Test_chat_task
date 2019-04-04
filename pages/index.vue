<template>
 <div class="c">122</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
	components: {},
	computed: {
		...mapGetters({ username: 'storeData/getUsername' })
	},
	beforeMount() {
		if (this.username === false) {
			this.$router.push('/login')
		}
	},
	methods: {
		...mapMutations({ setDefault: 'storeData/setUsername' })
	}
}
</script>

<style lang="sass" scoped>
</style>

