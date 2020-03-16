<template>
	<ul class="tab" >
		<li :style="{background: active==i?background:''}" :class="{active:active==i}" @click="tabclick(i)" v-for="(item,i) in tab" :key="i">{{item}}</li>
	</ul>
</template>

<script>
	export default {
		props:['background'],	
		data(){
			return {
                tab:['上架','下架','已被投标','被解决'],
                active:0
			}
		},
 		mounted(){
			console.log(this.tto)
         },		
         methods:{
             tabclick(i){
                 this.active=i
                 this.$parent.handleClick(i)
             }
         }
	}	
</script>

<style scoped="scoped" lang="less">
	.tab{
        text-align: center;
        width: 40%;
        margin: 0 auto;
        border: 1px solid #6666;
        cursor: pointer;
        border-radius:4px; 
        li{
            width: 25%; 
            line-height: 40px;          
            display: inline-block;           
            border-right:1px solid #6666;
            box-sizing: border-box;
        }
        li:last-child{
            border-right:none;
        }
        .active{
            color: white;
        }
	}
</style>