export default {
	namespaced: true, //命名空间为true
	state: {
		loginstate:JSON.parse(localStorage.getItem("user"))||null
	},
    mutations: {
      changelogin (state, value) {
        localStorage.setItem("user",JSON.stringify(value))
        state.loginstate = value
      }
    },
    actions: {
      changelogin ({commit},value) {
          commit("changelogin", value)
      }
    }	
}