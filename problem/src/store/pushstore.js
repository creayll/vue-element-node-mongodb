export default {
	namespaced: true, //命名空间为true
	state: {
		isshow:false
	},
    mutations: {
      	changeshow (state, value) {
      		console.log(value)
        	state.isshow = value
      	}
    },
    actions: {
		changeshow ({commit},value) {
		    commit("changeshow", value)
		}
    }	
}