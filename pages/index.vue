<template>
 <div class="c">122</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
	components: {},
	middleware: 'index',
	computed: {
		...mapGetters({ username: 'storeData/getUsername' })
	},
	methods: {
		...mapMutations({ setDefault: 'storeData/setUsername' })
	}
}
</script>

<style lang="sass" scoped>
</style>

