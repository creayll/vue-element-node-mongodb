export default {
	namespaced: true, //命名空间为true
	state: {
		messgenum:Number(localStorage.getItem('messagenum'))||0
	},
    mutations: {
        init(state,num){
			state.messgenum = num||0
			localStorage.setItem("messagenum",state.messgenum)
        },        
      	add(state){
			state.messgenum += 1
			localStorage.setItem("messagenum",state.messgenum)
      	},
      	reduce(state){
			  state.messgenum -= 1
			  localStorage.setItem("messagenum",state.messgenum)
      	}
    },
    actions: {
		changeinit ({commit},num) {
		    commit("init",num)
		},
		changeadd ({commit}) {
		    commit("add")
		},
		changereduce ({commit}) {
		    commit("reduce")
		}				
    }	
}