export default {
	namespaced: true, //命名空间为true
	state: {
		messgenum:0
	},
    mutations: {
        init(state,num){
            state.messgenum += num
        },        
      	add(state){
        	state.messgenum += 1
      	},
      	reduce(state){
      	    state.messgenum -= 1
      	}
    },
    actions: {
		changeinit ({commit},num) {
		    commit("init",num)
		},
    }	
}