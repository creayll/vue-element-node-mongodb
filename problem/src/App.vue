<template>
	<div id="app">
		<!--<div v-if="!$route.meta.isshownav">-->
			<elheader />
		<!--</div>-->
		<router-view />
		<!--<div v-if="!$route.meta.isshownav">-->
			<elfooter  :background='color'/>
		<!--</div>-->				
	</div>
</template>

<script>
	import elheader from 'base/head'
	import elfooter from 'base/footer'
	import "assets/icon/iconfont.css";
	import {mapActions, mapState,mapGetters} from "vuex";
	export default {
		name: 'App',	    
		computed: {
		  // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
		  	...mapState("themecolor",{
		   		color: state => state.color
			})
		},		
		components: {
			elheader,
			elfooter
		}
	}
</script>

<style scoped="scoped" lang="less">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*background: #f4f4f4;*/
		color: #2c3e50;
		font-size: 14px;
		padding-top: 60px;
		padding-bottom: 40px;
		position: relative;
		min-height: 100%;
		box-sizing: border-box;
		-moz-user-select: none; 
		-webkit-user-select: none; 
		-ms-user-select: none; 
		-khtml-user-select: none; 
		user-select: none; 		
	}
</style>