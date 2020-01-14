export default {
	namespaced: true, //命名空间为true
	state: {
		color:localStorage.themecolor ||'#2D4B69'
	},
    mutations: {
      changethemecolor (state, value) {
        state.color = value
      }
    },
    actions: {
		changethemecolor ({commit},value) {
		    commit("changethemecolor", value)
		}
    }	
}