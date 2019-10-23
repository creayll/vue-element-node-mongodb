export default {
	namespaced: true, //命名空间为true
	state: {
		loginstate:0
	},
    mutations: {
      changelogin (state, value) {
        state.loginstate += value
      }
    },
    actions: {
		changelogin ({commit},value) {
		    commit("changelogin", value)
		}
    }	
}